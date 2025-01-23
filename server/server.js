// Import dependencies
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.zz, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecyzted')).catch(err => console.error(err));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
    },
}));

// Mongoose Schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const WishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Wishlist = mongoose.model('Wishlist', WishlistSchema);

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized. Please log in first.' });
};

// Routes

// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add product
app.post('/products', isAuthenticated, async (req, res) => {
    const { name, description, price } = req.body;
    const userId = req.session.userId;

    try {
        const product = new Product({ name, description, price, owner: userId });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete product
app.delete('/products/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (!product.owner.equals(userId)) return res.status(403).json({ message: 'Forbidden' });

        await product.delete();
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update product
app.put('/products/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const userId = req.session.userId;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (!product.owner.equals(userId)) return res.status(403).json({ message: 'Forbidden' });

        product.name = name;
        product.description = description;
        product.price = price;
        await product.save();

        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add to wishlist
app.post('/wishlist', isAuthenticated, async (req, res) => {
    const { productId } = req.body;
    const userId = req.session.userId;

    try {
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        res.json({ message: 'Product added to wishlist', wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

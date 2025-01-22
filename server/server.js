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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Configure session
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
    },
}));

// Mongoose Schemas
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
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
    const { name, surname, password, email, address } = req.body;

    console.log('Received registration data:', req.body); // Log the incoming data

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({ name, surname, email, password: hashedPassword, address });
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

// Update profile details
app.put('/update-profile', isAuthenticated, async (req, res) => {
    const { name, surname, email, address } = req.body;
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.email = email || user.email;
        user.address = address || user.address;

        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete account
app.delete('/delete-account', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset password
app.put('/reset-password', isAuthenticated, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Routes for Product and Wishlist

// Create a product
app.post('/product', isAuthenticated, async (req, res) => {
    const { name, description, price, category, condition, imageUrl, sellingLocation } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            owner: req.session.userId,
            category,
            condition,
            imageUrl,
            sellingLocation
        });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
app.put('/product/:productId', isAuthenticated, async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, category, condition, imageUrl, sellingLocation } = req.body;
    try {
        const product = await Product.findOne({ _id: productId, owner: req.session.userId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.condition = condition || product.condition;
        product.imageUrl = imageUrl || product.imageUrl;
        product.sellingLocation = sellingLocation || product.sellingLocation;

        await product.save();
        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove a product
app.delete('/product/:productId', isAuthenticated, async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findOneAndDelete({ _id: productId, owner: req.session.userId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }
        res.json({ message: 'Product removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mark a product as sold
app.put('/product/sold/:productId', isAuthenticated, async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findOne({ _id: productId, owner: req.session.userId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        product.condition = 'sold';
        await product.save();
        res.json({ message: 'Product marked as sold', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a product to wishlist
app.post('/wishlist', isAuthenticated, async (req, res) => {
    const { productId } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ user: req.session.userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.session.userId, products: [] });
        }
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
            res.status(201).json({ message: 'Product added to wishlist', wishlist });
        } else {
            res.status(400).json({ message: 'Product already in wishlist' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove a product from wishlist
app.delete('/wishlist/:productId', isAuthenticated, async (req, res) => {
    const { productId } = req.params;
    try {
        const wishlist = await Wishlist.findOne({ user: req.session.userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        wishlist.products = wishlist.products.filter(id => !id.equals(productId));
        await wishlist.save();
        res.json({ message: 'Product removed from wishlist', wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View a user's wishlist
app.get('/wishlist', isAuthenticated, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.session.userId }).populate('products');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        res.json({ wishlist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS options
const corsOptions = {
    origin: "http://localhost:5173", // Allow only your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies/session
};

// Apply CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json()); // For parsing JSON in request bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// Example route for testing
app.get("/api/test", (req, res) => {
    res.json({ message: "CORS is working!" });
});


// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Session config
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
		cookie: { maxAge: 1000 * 60 * 60, httpOnly: true },
	})
);

// Schemas
const userSchema = new mongoose.Schema({
	name: String,
	surname: String,
	email: { type: String, unique: true },
	password: String,
	address: String,
	resetToken: String,
	resetTokenExpiry: Date,
});

const productSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: Number,
	location: String,
	condition: String,
	imageUrls: [String],
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "cls_users" },
});

const wishlistSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "cls_users" },
	product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const User = mongoose.model("cls_users", userSchema);
const Product = mongoose.model("Product", productSchema);
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Middleware to authenticate requests using userId
const isAuthenticated = (req, res, next) => {
    const userId = "67926f43557eb796414f94e6" // Extract userId from headers

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: userId is missing" });
    }

    // Optionally validate userId format or existence in your database
    // For now, we'll just assume userId is valid if it's provided
    req.user = { id: userId }; // Attach userId to the request object
    next(); // Proceed to the next middleware or route handler
};


// Routes
// Register
app.post("/auth/register", async (req, res) => {
	try {
		const { name, surname, email, password, address } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			surname,
			email,
			password: hashedPassword,
			address,
		});
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.post("/auth/login", async (req, res) => {
	try {
	  const { email, password } = req.body;
	  const user = await User.findOne({ email });
  
	  if (user && (await bcrypt.compare(password, user.password))) {
		// Create a JWT token
		const token = jwt.sign(
		  { id: user._id, email: user.email },
		  process.env.JWT_SECRET, // Your JWT secret key from the .env file
		  { expiresIn: '1h' } // Token expires in 1 hour
		);
  
		// Send the token as part of the response
		res.json({ message: "Login successful", token });
	  } else {
		res.status(401).json({ message: "Invalid credentials" });
	  }
	} catch (err) {
	  res.status(400).json({ error: err.message });
	}
  });

// Reset Password
app.post("/auth/reset-password", async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: "User not found" });

		const resetToken = uuidv4();
		user.resetToken = resetToken;
		user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
		await user.save();

		// Send resetToken to user via email (not implemented)
		res.json({ message: "Password reset token generated", token: resetToken });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Update Password
app.post("/auth/update-password", async (req, res) => {
	try {
		const { resetToken, newPassword } = req.body;
		const user = await User.findOne({
			resetToken,
			resetTokenExpiry: { $gt: Date.now() },
		});

		if (!user)
			return res.status(400).json({ message: "Invalid or expired token" });

		user.password = await bcrypt.hash(newPassword, 10);
		user.resetToken = undefined;
		user.resetTokenExpiry = undefined;
		await user.save();
		res.json({ message: "Password updated successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Products CRUD
app.post("/products", isAuthenticated, async (req, res) => {
	try {
		const { name, description, price, location, condition, imageUrls } =
			req.body;
		const product = new Product({
			name,
			description,
			price,
			location,
			condition,
			imageUrls,
			owner: req.session.userId,
		});
		await product.save();
		res.status(201).json({ message: "Product created successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.get("/products", async (req, res) => {
	const products = await Product.find();
	res.json(products);
});

app.put("/products/:id", isAuthenticated, async (req, res) => {
	try {
		const product = await Product.findOneAndUpdate(
			{ _id: req.params.id, owner: req.session.userId },
			req.body,
			{ new: true }
		);
		if (!product) return res.status(404).json({ message: "Product not found" });
		res.json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.delete("/products/:id", isAuthenticated, async (req, res) => {
	try {
		const product = await Product.findOneAndDelete({
			_id: req.params.id,
			owner: req.session.userId,
		});
		if (!product) return res.status(404).json({ message: "Product not found" });
		res.json({ message: "Product deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Wishlist CRUD
app.post("/wishlist", isAuthenticated, async (req, res) => {
	try {
		const { productId } = req.body;
		const wishlistItem = new Wishlist({
			user: req.session.userId,
			product: productId,
		});
		await wishlistItem.save();
		res.status(201).json({ message: "Item added to wishlist" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.get("/wishlist", isAuthenticated, async (req, res) => {
	const wishlist = await Wishlist.find({ user: req.session.userId }).populate(
		"product"
	);
	res.json(wishlist);
});

app.delete("/wishlist/:id", isAuthenticated, async (req, res) => {
	try {
		const wishlistItem = await Wishlist.findOneAndDelete({
			_id: req.params.id,
			user: req.session.userId,
		});
		if (!wishlistItem)
			return res.status(404).json({ message: "Wishlist item not found" });
		res.json({ message: "Item removed from wishlist" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Start Server
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);

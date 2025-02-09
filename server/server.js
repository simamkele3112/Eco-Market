const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 3000;

// CORS Configuration
app.use(
	cors({
		origin: "http://localhost:5173", // React Frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true, // Allows sending cookies
	})
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: "Unauthorized. No token provided." });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({ message: "Invalid or expired token" });
		req.user = user; // Attach user info to request
		next();
	});
};

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", authenticateToken, require("./routes/productRoutes"));
app.use("/wishlist", authenticateToken, require("./routes/wishlistRoutes"));

// Start Server
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);

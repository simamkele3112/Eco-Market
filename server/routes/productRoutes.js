const express = require("express");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔹 JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token)
		return res.status(401).json({ message: "Unauthorized. Token required." });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err)
			return res.status(403).json({ message: "Invalid or expired token" });
		req.user = decoded;
		next();
	});
};

const multer = require("multer");

// Set up multer storage engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Set the directory where the images will be stored
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname); // Ensure unique file names
	},
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// 🔹 Create Product (Protected)

// Create Product (Protected)
router.post(
	"/",
	authenticateToken,
	upload.array("itemImages"),
	async (req, res) => {
		try {
			const { name, description, price, location, condition } = req.body;
			const imageUrls = req.files.map((file) => file.path); // Map the uploaded file paths

			const product = new Product({
				name,
				description,
				price,
				location,
				condition,
				imageUrls, // Store the file paths in the database
				owner: req.user.id, // Extracted from JWT token
			});

			await product.save();
			res
				.status(201)
				.json({ message: "✅ Product created successfully", product });
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	}
);

// 🔹 Get All Products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find().select("-__v"); // Excludes MongoDB version key
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// 🔹 Update Product (Protected)
router.put("/:id", authenticateToken, async (req, res) => {
	try {
		const product = await Product.findOneAndUpdate(
			{ _id: req.params.id, owner: req.user.id }, // Only owner can edit
			req.body,
			{ new: true }
		);
		if (!product)
			return res
				.status(404)
				.json({ message: "❌ Product not found or unauthorized" });

		res.json({ message: "✅ Product updated successfully", product });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// 🔹 Delete Product (Protected)
router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const product = await Product.findOneAndDelete({
			_id: req.params.id,
			owner: req.user.id, // Only owner can delete
		});
		if (!product)
			return res
				.status(404)
				.json({ message: "❌ Product not found or unauthorized" });

		res.json({ message: "✅ Product deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;

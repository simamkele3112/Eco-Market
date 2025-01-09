const Product = require("../models/Product");
const User = require("../models/User");

// Add a new product
const addProduct = async (req, res) => {
	const { name, type, category, condition, location, offerDelivery } = req.body;
	const userId = req.userId;

	try {
		const product = new Product({
			name,
			type,
			category,
			condition,
			location,
			offerDelivery,
			userId,
		});
		await product.save();
		res.status(201).json(product);
	} catch (err) {
		res.status(500).send("Server error");
	}
};

// Get all products
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).send("Server error");
	}
};

// Get products by location
const getProductsByLocation = async (req, res) => {
	const { location } = req.params;
	try {
		const products = await Product.find({ location });
		res.json(products);
	} catch (err) {
		res.status(500).send("Server error");
	}
};

// Search products by title
const searchProducts = async (req, res) => {
	const { query } = req.query;
	try {
		const products = await Product.find({
			name: { $regex: query, $options: "i" },
		});
		res.json(products);
	} catch (err) {
		res.status(500).send("Server error");
	}
};

// Delete a product
const deleteProduct = async (req, res) => {
	const { productId } = req.params;
	try {
		const product = await Product.findByIdAndDelete(productId);
		if (!product) return res.status(404).send("Product not found");
		res.status(200).send("Product deleted");
	} catch (err) {
		res.status(500).send("Server error");
	}
};

module.exports = {
	addProduct,
	getAllProducts,
	getProductsByLocation,
	searchProducts,
	deleteProduct,
};

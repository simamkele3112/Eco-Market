const User = require("../models/User");
const Product = require("../models/Product");

// Add product to wishlist
const addToWishlist = async (req, res) => {
	const { productId } = req.body;
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		const product = await Product.findById(productId);

		if (!product) return res.status(404).send("Product not found");

		if (user.wishlist.includes(productId)) {
			return res.status(400).send("Product already in wishlist");
		}

		user.wishlist.push(productId);
		await user.save();
		res.status(200).send("Product added to wishlist");
	} catch (err) {
		res.status(500).send("Server error");
	}
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
	const { productId } = req.body;
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
		await user.save();
		res.status(200).send("Product removed from wishlist");
	} catch (err) {
		res.status(500).send("Server error");
	}
};

module.exports = { addToWishlist, removeFromWishlist };

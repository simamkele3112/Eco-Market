const express = require("express");
const { register, login } = require("../controllers/authController");
const {
	addProduct,
	getAllProducts,
	getProductsByLocation,
	searchProducts,
	deleteProduct,
} = require("../controllers/productController");
const {
	addToWishlist,
	removeFromWishlist,
} = require("../controllers/wishlistController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// Product Routes
router.post("/product", authenticate, addProduct);
router.get("/products", getAllProducts);
router.get("/products/location/:location", getProductsByLocation);
router.get("/products/search", searchProducts);
router.delete("/product/:productId", authenticate, deleteProduct);

// Wishlist Routes
router.post("/wishlist", authenticate, addToWishlist);
router.delete("/wishlist", authenticate, removeFromWishlist);

module.exports = router;

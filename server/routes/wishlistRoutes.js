const express = require("express");
const Wishlist = require("../models/Wishlist");

const router = express.Router();

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Add to Wishlist
router.post("/", isAuthenticated, async (req, res) => {
    try {
        const { productId } = req.body;
        const wishlistItem = new Wishlist({ user: req.session.userId, product: productId });
        await wishlistItem.save();
        res.status(201).json({ message: "Item added to wishlist" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Wishlist Items
router.get("/", isAuthenticated, async (req, res) => {
    const wishlist = await Wishlist.find({ user: req.session.userId }).populate("product");
    res.json(wishlist);
});

// Remove from Wishlist
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findOneAndDelete({
            _id: req.params.id,
            user: req.session.userId,
        });
        if (!wishlistItem) return res.status(404).json({ message: "Wishlist item not found" });
        res.json({ message: "Item removed from wishlist" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

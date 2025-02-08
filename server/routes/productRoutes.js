const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Create Product
router.post("/", isAuthenticated, async (req, res) => {
    try {
        const { name, description, price, location, condition, imageUrls } = req.body;
        const product = new Product({ name, description, price, location, condition, imageUrls, owner: req.session.userId });
        await product.save();
        res.status(201).json({ message: "Product created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Update Product
router.put("/:id", isAuthenticated, async (req, res) => {
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

// Delete Product
router.delete("/:id", isAuthenticated, async (req, res) => {
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

module.exports = router;

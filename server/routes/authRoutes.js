const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

const router = express.Router();

// Routes
// Register
router.post("/register", async (req, res) => {
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
 
// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user._id;
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
 
 // Get User Profile
router.get("/profile", async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }
 
        // Fetch user details (excluding password)
        const user = await User.findById(req.session.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
 
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
// Reset Password
router.post("/reset-password", async (req, res) => {
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
router.post("/update-password", async (req, res) => {
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

module.exports = router;

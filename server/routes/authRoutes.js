const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// 🔹 Configure Express-Session Middleware
router.use(
	session({
		secret: process.env.SESSION_SECRET, // Use a strong secret
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // 1 hour
	})
);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Unauthorized. Token required." });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Invalid or expired token" });
		}
		req.user = decoded;
		next();
	});
};

// 📌 Register Route
router.post(
	"/register",
	[
		body("name").trim().notEmpty().withMessage("Name is required"),
		body("surname").trim().notEmpty().withMessage("Surname is required"),
		body("email").isEmail().withMessage("Invalid email format"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
		body("address").trim().notEmpty().withMessage("Address is required"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { name, surname, email, password, address } = req.body;
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				return res.status(400).json({ message: "Email already exists" });
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({
				name,
				surname,
				email,
				password: hashedPassword,
				address,
			});

			await user.save();

			// Generate JWT Token
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			res.status(201).json({ message: "User registered successfully", token });
		} catch (err) {
			res.status(500).json({ error: "Internal server error" });
		}
	}
);

// 📌 Login Route (Stores user ID in session)
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Generate JWT Token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		// 🔹 Store user ID in the session
		req.session.userId = user._id;

		res.json({ message: "Login successful", token });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// 📌 Get User Profile (Protected Route)
router.get("/profile", authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// 📌 Status Route (Authentication Check)
router.get("/status", authenticateToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Respond with authentication status
		res.json({ isAuthenticated: true });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// 📌 Password Reset Route
router.post("/password-reset", async (req, res) => {
	const { email, newPassword } = req.body;

	if (!email || !newPassword) {
		return res
			.status(400)
			.json({ message: "Email and new password are required" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;

		await user.save();

		res.json({ message: "Password reset successful" });
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// 📌 Logout Route (Destroy Session)
router.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ error: "Logout failed" });
		}
		res.json({ message: "Logged out successfully" });
	});
});

module.exports = router;

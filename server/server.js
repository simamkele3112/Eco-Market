const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/.env" });

const multer = require("multer");
const path = require("path");

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

// Set up multer storage engine to specify the destination and filename for uploaded files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Specify the folder where images will be stored
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname); // Naming the uploaded file with a timestamp
	},
});

// Initialize multer with the defined storage settings and file size limit
const upload = multer({
	storage: storage,
	limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit to 50MB
	fileFilter: (req, file, cb) => {
		// Allow only image file types (e.g., jpg, jpeg, png)
		const allowedTypes = /jpeg|jpg|png/;
		const mimeType = allowedTypes.test(file.mimetype);
		if (mimeType) {
			return cb(null, true);
		}
		cb(new Error("Invalid file type"));
	},
});

// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", authenticateToken, require("./routes/productRoutes"));
app.use("/wishlist", authenticateToken, require("./routes/wishlistRoutes"));

// Start Server
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const userExist = await User.findOne({ email });
		if (userExist) return res.status(400).send("User already exists");

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, email, password: hashedPassword });
		await user.save();

		const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
			expiresIn: "1h",
		});
		res.status(201).json({ token });
	} catch (err) {
		res.status(500).send("Server error");
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).send("User not found");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).send("Invalid credentials");

		const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (err) {
		res.status(500).send("Server error");
	}
};

module.exports = { register, login };

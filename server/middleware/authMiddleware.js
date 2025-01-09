const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");

	if (!token) return res.status(401).send("Access denied");

	try {
		const decoded = jwt.verify(token, "yourSecretKey");
		req.userId = decoded.userId;
		next();
	} catch (err) {
		res.status(401).send("Invalid token");
	}
};

module.exports = authenticate;

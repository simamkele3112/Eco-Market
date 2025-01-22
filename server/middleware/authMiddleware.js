const authenticate = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
	  return res.status(401).json({ error: "Unauthorized access, token missing" });
	}
	try {
	  // Simulate token verification (use `jwt.verify` if using JWT tokens)
	  if (token === "dummyToken") {
		next();
	  } else {
		throw new Error("Invalid token");
	  }
	} catch (err) {
	  res.status(401).json({ error: "Unauthorized access, invalid token" });
	}
  };
  
  module.exports = authenticate;
  
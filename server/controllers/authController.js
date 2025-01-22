// authController.js
exports.register = (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
	  return res.status(400).json({ error: "Username and password are required" });
	}
	res.status(201).json({ message: "User registered successfully" });
  };
  
  exports.login = (req, res) => {
	const { username, password } = req.body;
	if (username === "test" && password === "password") {
	  return res.status(200).json({ message: "Login successful", token: "dummyToken" });
	}

	res.status(401).json({ error: "Invalid credentials" + username  + password });
  };
  
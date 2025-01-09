const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");

const app = express();
app.use(bodyParser.json());

mongoose
	.connect("mongodb://localhost:27017/marketplace", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

app.use("/api", apiRoutes);

app.listen(5000, () => {
	console.log("Server running on port 5000");
});

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	category: { type: String, required: true },
	condition: { type: String, required: true },
	location: { type: String, required: true },
	offerDelivery: { type: Boolean, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		condition: { type: String, required: true },
		location: { type: String, required: true },
		offerDelivery: { type: Boolean, required: false, default: false },
		imageUrls: { type: [String], required: false }, // Store image paths
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

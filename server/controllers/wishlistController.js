exports.addToWishlist = (req, res) => {
	const { productId } = req.body;
	if (!productId) {
	  return res.status(400).json({ error: "Product ID is required" });
	}
	res.status(200).json({ message: "Product added to wishlist", productId });
  };
  
  exports.removeFromWishlist = (req, res) => {
	const { productId } = req.body;
	if (!productId) {
	  return res.status(400).json({ error: "Product ID is required" });
	}
	res.status(200).json({ message: "Product removed from wishlist", productId });
  };
  
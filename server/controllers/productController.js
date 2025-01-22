exports.addProduct = (req, res) => {
	const { name, location, price } = req.body;
	if (!name || !location || !price) {
	  return res.status(400).json({ error: "Name, location, and price are required" });
	}
	res.status(201).json({ message: "Product added successfully", product: { name, location, price } });
  };
  
  exports.getAllProducts = (req, res) => {
	res.status(200).json({ products: [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }] });
  };
  
  exports.getProductsByLocation = (req, res) => {
	const { location } = req.params;
	res.status(200).json({ products: [{ id: 1, name: "Product 1", location }] });
  };
  
  exports.searchProducts = (req, res) => {
	const { query } = req.query;
	res.status(200).json({ results: [{ id: 1, name: "Matching Product", query }] });
  };
  
  exports.deleteProduct = (req, res) => {
	const { productId } = req.params;
	res.status(200).json({ message: `Product with ID ${productId} deleted successfully` });
  };
  
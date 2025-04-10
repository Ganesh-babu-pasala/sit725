const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const formatted = products.map(item => ({
      title: item.productName,
      image: item.imageURL,
      link: item.category,
      description: item.description,
      pros: item.pros,
      cons: item.cons,
      recommendation: item.recommendation,
      rating: item.rating
    }));
    res.json({ statusCode: 200, data: formatted, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Server error" });
  }
};

exports.addProduct = async (req, res) => {
  if (req.body.adminKey !== "secret123") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const rating = parseInt(req.body.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const newProduct = new Product({
      productName: req.body.productName,
      imageURL: req.body.imageURL,
      category: req.body.category,
      description: req.body.description,
      pros: req.body.pros,
      cons: req.body.cons,
      recommendation: req.body.recommendation,
      rating: rating
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save product" });
  }
};

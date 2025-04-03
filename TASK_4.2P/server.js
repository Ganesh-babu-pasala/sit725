const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const Product = require("./models/Product");

app.get("/api/projects", async (req, res) => {
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
});

app.post("/api/projects", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
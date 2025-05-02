const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

// Correct routes:
router.get("/api/products", productController.getAllProducts);
router.post("/api/products", productController.addProduct);

module.exports = router;

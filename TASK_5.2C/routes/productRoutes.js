const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');

// API Endpoints
router.get('/api/projects', controller.getAllProducts);
router.post('/api/projects', controller.addProduct);

module.exports = router;

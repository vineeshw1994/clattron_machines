const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');

router.use('/admin', adminRoutes);

// Add more route groups here if needed (e.g., public routes for frontend data)
router.get('/categories', (req, res) => {
  // Controller to fetch categories for frontend
  require('../controllers/adminController').getCategories(req, res);
});

router.get('/products', (req, res) => {
  // Fetch products for frontend
  require('../controllers/adminController').getProducts(req, res);
});

router.get('/products/:id', (req, res) => {
  // Fetch single product
  require('../controllers/adminController').getProductById(req, res);
});

router.get('/company-info', (req, res) => {
  // Fetch company info for frontend
  require('../controllers/adminController').getCompanyInfo(req, res);
});

module.exports = router;
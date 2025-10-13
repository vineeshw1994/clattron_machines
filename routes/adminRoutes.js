const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../utils/jwtUtils");
const multer = require("multer");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Public route: Login
router.post("/login", adminController.login);

router.get("/featured-machines", adminController.getFeaturedMachines);

// get explored products
router.get("/explored-machines", adminController.getExploredProducts);

router.get("/products-clients", adminController.getProducts_clients);

// Get single product by ID
router.get("/products/:id", adminController.getProductById);

// Add public route in routes/company.js or admin.js
router.get('/public', adminController.getPublicCompanyInfo);

// Protected routes
router.use(verifyToken); // Middleware to protect below routes

router.get("/dashboard", (req, res) => res.send("Welcome to Dashboard")); // Placeholder

router.post("/categories", adminController.createCategory);
router.get("/categories", adminController.getCategories);
router.put("/categories/:id", adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

router.post("/products", upload.single("image"), adminController.createProduct);
router.get("/products", adminController.getProducts);

router.get("/featured-machines", adminController.getFeaturedMachines);

router.get("/products-clients", adminController.getProducts_clients);

router.put(
  "/products/:id",
  upload.single("image"),
  adminController.updateProduct
);
router.delete("/products/:id", adminController.deleteProduct);

// Toggle product disable status
router.patch(
  "/products/:id/toggle-disable",
  verifyToken,
  adminController.toggleProductDisable
);

// Toggle product featured status
router.patch(
  "/products/:id/toggle-featured",
  verifyToken,
  adminController.toggleFeatured
);

// Toggle product explored status
router.patch(
  "/products/:id/toggle-explored",
  verifyToken,
  adminController.toggleExplored
);


router.put(
  "/company-info",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  adminController.updateCompanyInfo
);
router.get("/company-info", adminController.getCompanyInfo);



router.post("/logout", verifyToken, adminController.logout);

// GET profile
router.get('/profile', verifyToken, adminController.getProfile);

// PUT profile info
router.put('/profile', verifyToken, adminController.updateProfile);

// PUT password
router.put('/profile/password', verifyToken, adminController.updatePassword);


//All customers
router.get('/all-customers', verifyToken, adminController.getAllCustomers);

// Admin - List customers
router.get('/customers', verifyToken, adminController.getCustomers);

// Admin - Export
router.get('/customers/export', verifyToken, adminController.exportCustomers);

module.exports = router;

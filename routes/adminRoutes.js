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

router.get("/products-clients", adminController.getProducts_clients);

// Get single product by ID
router.get("/products/:id", adminController.getProductById);

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

router.patch(
  "/products/:id/toggle-featured",
  verifyToken,
  adminController.toggleFeatured
);

router.put(
  "/company-info",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  adminController.updateCompanyInfo
);
router.get("/company-info", adminController.getCompanyInfo);

router.post("/logout", verifyToken, adminController.logout);

module.exports = router;

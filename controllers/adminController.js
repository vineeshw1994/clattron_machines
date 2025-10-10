const CompanyInfo = require("../models/CompanyInfo");
const Product = require("../models/Product");
const adminService = require("../services/adminService");
const fs = require("fs").promises;
const path = require("path");

exports.login = async (req, res) => {
  try {
    console.log(req.body, "----->req.body");
    const token = await adminService.login(req.body);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = (req, res, next) => {
  try {
    console.log("logout function");
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "Signout Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await adminService.createCategory(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await adminService.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await adminService.updateCategory(req.params.id, req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await adminService.deleteCategory(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, specs } = req.body;
    const product = new Product({
      name,
      description,
      category,
      specs: JSON.parse(specs),
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Error creating product" });
  }
};

exports.getFeaturedMachines = async (req, res) => {
  try {
    const featuredMachines = await Product.find({
      featured: true,
      disabled: false,
    }) // Only active featured ones
      .populate("category", "name") 
      .select("name description image specs") 
      .limit(10) 
      .sort({ createdAt: -1 }); 

    res.json(featuredMachines);
  } catch (err) {
    console.error("Error fetching featured machines:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await adminService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts_clients = async (req, res) => {
  try {
      const products = await Product.find({
      disabled: false,
    }) // Only active featured ones
      .populate("category", "name") 
      .select("name description image specs") 
      .sort({ createdAt: -1 }); 

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await adminService.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, category, specs } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete old image if a new one is uploaded
    if (req.file && product.image) {
      const oldImagePath = path.join(__dirname, "..", product.image);
      try {
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.error("Error deleting old image:", err);
      }
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.specs = JSON.parse(specs);
    if (req.file) product.image = `/uploads/${req.file.filename}`;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from uploads folder
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image); // Fine if uploads is one level up
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        res.json({
          message: "Product deleted",
          warning: "Image cleanup failed",
        });
      }
    }

    await Product.findByIdAndDelete(product._id);

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err); // Log the full error too
    res.status(500).json({ message: "Server error" });
  }
};

// get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleProductDisable = async (req, res) => {
  try {
    const { disabled } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.disabled = disabled;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Error toggling product status" });
  }
};

exports.toggleFeatured = async (req, res) => {
  try {
    const { featured } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { featured },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Featured status updated", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCompanyInfo = async (req, res) => {
  try {
    let companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      companyInfo = new CompanyInfo({});
    }

    const { name, address, phone, email, about } = req.body;
    console.log(req.body);
    // Delete old logo if new logo is uploaded
    if (req.files.logo && companyInfo.logo) {
      const oldLogoPath = path.join(__dirname, "..", companyInfo.logo);
      try {
        await fs.unlink(oldLogoPath);
      } catch (err) {
        console.error("Error deleting old logo:", err);
      }
    }

    // Delete old favicon if new favicon is uploaded
    if (req.files.favicon && companyInfo.favicon) {
      const oldFaviconPath = path.join(__dirname, "..", companyInfo.favicon);
      try {
        await fs.unlink(oldFaviconPath);
      } catch (err) {
        console.error("Error deleting old favicon:", err);
      }
    }

    companyInfo.name = name || companyInfo.name;
    companyInfo.address = address || companyInfo.address;
    companyInfo.phone = phone || companyInfo.phone;
    companyInfo.email = email || companyInfo.email;
    companyInfo.about = about || companyInfo.about;
    if (req.files.logo)
      companyInfo.logo = `/uploads/${req.files.logo[0].filename}`;
    if (req.files.favicon)
      companyInfo.favicon = `/uploads/${req.files.favicon[0].filename}`;

    await companyInfo.save();
    res.json(companyInfo);
  } catch (err) {
    res.status(400).json({ message: "Error updating company info" });
  }
};

exports.getCompanyInfo = async (req, res) => {
  try {
    const info = await adminService.getCompanyInfo();
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

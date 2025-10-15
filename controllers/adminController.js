const Admin = require("../models/Admin");
const CompanyInfo = require("../models/CompanyInfo");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const adminService = require("../services/adminService");
const fs = require("fs").promises;
const path = require("path");
const XLSX = require("xlsx");

exports.login = async (req, res) => {
  try {
    console.log(req.body, "----->req.body");
    const result = await adminService.login(req.body);

    res
      .cookie("access_token", result.token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        token: result.token,
        user: result.user, // This goes to thunk's data.user
      });
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

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, specs } = req.body;

    let parsedSpecs = {};
    if (specs) {
      const specsData = JSON.parse(specs);
      if (Array.isArray(specsData)) {
        specsData.forEach((item) => {
          if (item.key && item.value) parsedSpecs[item.key] = item.value;
        });
      } else {
        parsedSpecs = specsData;
      }
    }

    const product = new Product({
      name,
      description,
      category,
      specs: parsedSpecs,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
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

// get explored products
exports.getExploredProducts = async (req, res) => {
  try {
    const exploredProducts = await Product.find({
      explored: true,
      disabled: false,
    }) // Only active explored ones
      .populate("category", "name")
      .select("name description image specs")
      .limit(6)
      .sort({ createdAt: -1 });
    res.json(exploredProducts);
  } catch (err) {
    console.error("Error fetching explored products:", err);
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

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, category, specs } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete old image if new one uploaded
    if (req.file && product.image) {
      const oldImagePath = path.join(__dirname, "..", product.image);
      try {
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.warn("Could not delete old image:", err.message);
      }
    }

    // Parse specs
    let parsedSpecs = {};
    if (specs) {
      const specsData = JSON.parse(specs);
      if (Array.isArray(specsData)) {
        specsData.forEach((item) => {
          if (item.key && item.value) parsedSpecs[item.key] = item.value;
        });
      } else {
        parsedSpecs = specsData;
      }
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.specs = parsedSpecs;
    if (req.file) product.image = `/uploads/${req.file.filename}`;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
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

// Toggle explored status
exports.toggleExplored = async (req, res) => {
  try {
    const { explored } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { explored },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Explored status updated", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Updated Controller (companyController.js)
exports.updateCompanyInfo = async (req, res) => {
  try {
    let companyInfo = await CompanyInfo.findOne();
    if (!companyInfo) {
      companyInfo = new CompanyInfo({});
    }

    const { name, address, city, state, zipcode, phone, email, about } =
      req.body;
    console.log(req.body);

    // Delete old logo if new uploaded
    if (req.files.logo && companyInfo.logo) {
      const oldLogoPath = path.join(__dirname, "..", companyInfo.logo);
      try {
        await fs.unlink(oldLogoPath);
      } catch (err) {
        console.error("Error deleting old logo:", err);
      }
    }

    // Delete old favicon if new uploaded
    if (req.files.favicon && companyInfo.favicon) {
      const oldFaviconPath = path.join(__dirname, "..", companyInfo.favicon);
      try {
        await fs.unlink(oldFaviconPath);
      } catch (err) {
        console.error("Error deleting old favicon:", err);
      }
    }

    // Delete old video if new uploaded
    if (req.files.video && companyInfo.video) {
      const oldVideoPath = path.join(__dirname, "..", companyInfo.video);
      try {
        await fs.unlink(oldVideoPath);
      } catch (err) {
        console.error("Error deleting old video:", err);
      }
    }

    // Update fields
    companyInfo.name = name || companyInfo.name;
    companyInfo.address = address || companyInfo.address;
    companyInfo.city = city || companyInfo.city;
    companyInfo.state = state || companyInfo.state;
    companyInfo.zipcode = zipcode || companyInfo.zipcode;
    companyInfo.phone = phone || companyInfo.phone;
    companyInfo.email = email || companyInfo.email;
    companyInfo.about = about || companyInfo.about;
    if (req.files.logo)
      companyInfo.logo = `/uploads/${req.files.logo[0].filename}`;
    if (req.files.favicon)
      companyInfo.favicon = `/uploads/${req.files.favicon[0].filename}`;
    if (req.files.video)
      companyInfo.video = `/uploads/${req.files.video[0].filename}`;

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

exports.getPublicCompanyInfo = async (req, res) => {
  try {
    const info = await CompanyInfo.findOne();
    res.json(info || {});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/profile - Fetch admin profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password"); // Exclude password
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/admin/profile - Update profile info
exports.updateProfile = async (req, res) => {
  console.log('this is profile update function')
  try {
    const { name, email, mobile, username } = req.body;
 console.log(req.body,'req body ')
    // Validate username uniqueness if provided
    if (username) {
      const existingAdmin = await Admin.findOne({
        username,
        _id: { $ne: req.user.id },
      });
      if (existingAdmin) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const updateData = { name, email, mobile, username };
    console.log('nice to update')
    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );
console.log('final stage')
    const admin = await Admin.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
console.log('updated data')
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};

// PUT /api/admin/profile/password - Update password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new passwords are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating password" });
  }
};

// get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
};

// GET /api/admin/customers - List customers with search, pagination, dates
exports.getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", fromDate, toDate } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate) query.createdAt = { $gte: new Date(fromDate) };
    if (toDate)
      query.createdAt = { ...query.createdAt, $lte: new Date(toDate) };

    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Customer.countDocuments(query);

    res.json({
      customers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching customers" });
  }
};

// GET /api/admin/customers/export - Download Excel
exports.exportCustomers = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    const query = {};
    if (fromDate) query.createdAt = { $gte: new Date(fromDate) };
    if (toDate)
      query.createdAt = { ...query.createdAt, $lte: new Date(toDate) };

    const customers = await Customer.find(query).sort({ createdAt: -1 });

    // Generate Excel
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["Name", "Email", "Phone", "Message", "Date"],
      ...customers.map((c) => [
        c.name,
        c.email,
        c.phone,
        c.message,
        new Date(c.createdAt).toLocaleString(),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Customers");

    // Send as download
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader("Content-Disposition", "attachment; filename=customers.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error exporting customers" });
  }
};

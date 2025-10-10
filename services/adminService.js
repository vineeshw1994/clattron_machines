const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Product = require('../models/Product');
const CompanyInfo = require('../models/CompanyInfo');
const { generateToken } = require('../utils/jwtUtils');

exports.login = async ({ username, password }) => {
  const admin = await Admin.findOne({ username });
  console.log(admin,'----->admin')
  if (!admin || !(await admin.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  return generateToken({ id: admin._id });
};

exports.createCategory = (data) => Category.create(data);

exports.getCategories = () => Category.find();

exports.updateCategory = (id, data) => Category.findByIdAndUpdate(id, data, { new: true });

exports.deleteCategory = (id) => Category.findByIdAndDelete(id);

exports.createProduct = (data) => Product.create(data);

exports.getProducts = () => Product.find().populate('category');

exports.getProductById = (id) => Product.findById(id).populate('category');

exports.updateProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });

exports.deleteProduct = (id) => Product.findByIdAndDelete(id);

exports.updateCompanyInfo = async (data) => {
  let info = await CompanyInfo.findOne();
  if (!info) info = new CompanyInfo();
  Object.assign(info, data);
  return info.save();
};

exports.getCompanyInfo = async () => {
  let info = await CompanyInfo.findOne();
  if (!info) info = new CompanyInfo({ name: 'Clattron Machines' }); // Default
  return info;
};
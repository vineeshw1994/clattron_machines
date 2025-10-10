const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  about: { type: String },
  logo: { type: String }, // Path to logo (e.g., /uploads/logo.png)
  favicon: { type: String }, // Path to favicon (e.g., /uploads/favicon.ico)
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
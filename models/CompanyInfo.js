// Updated Model (CompanyInfo.js)
const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  about: { type: String },
  logo: { type: String }, // Path to logo
  favicon: { type: String }, // Path to favicon
  video: { type: String }, // Path to video
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
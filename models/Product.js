// Updated Product Schema (src/models/Product.js or wherever it's defined)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  specs: { type: Map, of: String },
  image: { type: String },
  disabled: { type: Boolean, default: false },
  featured: { type: Boolean, default: false }, // Added featured field
});

module.exports = mongoose.model('Product', productSchema);
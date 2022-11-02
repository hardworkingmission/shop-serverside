const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema(
  {
    tile: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Product = new mongoose.model('Product', ProductScheme);

module.exports = { Product };

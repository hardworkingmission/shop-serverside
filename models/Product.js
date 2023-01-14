const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    isOff: { type: Boolean, default: true },
    category: { type: String, required: true },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    offPercentage: { type: String, required: false },
    imgList:  { type: Array },
  },
  {
    timestamps: true,
  }
);
const Product = new mongoose.model('Product', ProductScheme);

module.exports = { Product };

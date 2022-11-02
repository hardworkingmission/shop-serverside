const mongoose = require('mongoose');

const CartScheme = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Cart = new mongoose.model('Cart', CartScheme);

module.exports = { Cart };

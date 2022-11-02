const { Cart } = require('../models/Cart');

//all carts
const allCarts = async (req, res) => {
  try {
    const result = await Cart.find({});
    res.status(400).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//get a single cart by user
const singleCart = async (req, res) => {
  try {
    const userId = req.params?.id;
    const result = await Cart.findById({ userId });
    res.status(400).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//create a cart
const createCart = async (req, res) => {
  try {
    const cartInfo = req?.body;
    const result = await Cart.create(cartInfo);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//update a cart
const updateCart = async (req, res) => {
  try {
    const cartId = req.params?.id;
    const result = await Cart.findByIdAndUpdate(
      cartId,
      { $set: req?.body },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

// delete a cart
const deleteCart = async (req, res) => {
  try {
    const cartId = req.params?.id;
    const result = await Cart.findByIdAndDelete(cartId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};
module.exports = { allCarts, singleCart, createCart, updateCart, deleteCart };

const express = require('express');
const {
  createCart,
  updateCart,
  allCarts,
  deleteCart,
  singleCart,
  removeCartItem,
} = require('../controllers/cart');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const router = express.Router();

router
  .route('/')
  .post(verifyToken, createCart)
  .get(verifyToken, allCarts);
router
  .route('/:id')
  .delete(verifyToken, removeCartItem)
  .get(verifyTokenAndAuthorization, singleCart)
  .put(verifyTokenAndAuthorization, updateCart)
  //.delete(verifyTokenAndAuthorization, deleteCart);

module.exports = router;

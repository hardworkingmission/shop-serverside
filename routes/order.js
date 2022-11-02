const express = require('express');
const {
  createOrder,
  updateOrder,
  allOrders,
  deleteOrder,
  singleUserOrder,
  incomeStat,
} = require('../controllers/order');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const router = express.Router();

router.route('/incomeStat').get(verifyTokenAndAdmin, incomeStat);
router
  .route('/')
  .post(verifyToken, createOrder)
  .get(verifyTokenAndAdmin, allOrders);
router
  .route('/:id')
  .get(verifyTokenAndAuthorization, singleUserOrder)
  .put(verifyTokenAndAdmin, updateOrder)
  .delete(verifyTokenAndAdmin, deleteOrder);

module.exports = router;

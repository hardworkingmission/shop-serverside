const express = require('express');
const {
  allProducts,
  createProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = express.Router();

router.route('/').get(allProducts).post(verifyTokenAndAdmin, createProduct);
router
  .route('/:id')
  .get(singleProduct)
  .put(updateProduct)
  .delete(verifyTokenAndAdmin, deleteProduct);

module.exports = router;

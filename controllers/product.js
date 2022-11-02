const { Product } = require('../models/Product');

//all products
const allProducts = async (req, res) => {
  const qNew = req.query?.new;
  const qCategory = req.query?.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//single product
const singleProduct = async (req, res) => {
  try {
    const productId = req.params?.id;
    //console.log(productId);
    const result = await Product.findById(productId);
    res.status(400).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//create product
const createProduct = async (req, res) => {
  try {
    const productInfo = req?.body;
    const result = await Product.create(productInfo);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//update a product
const updateProduct = async (req, res) => {
  console.log(req.body)
  try {
    const productId = req.params?.id;
    const result = await Product.findByIdAndUpdate(
      productId,
      { $set: {quantity:req?.body.quantity} },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params?.id;
    const result = await Product.findByIdAndDelete(productId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

module.exports = {
  allProducts,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

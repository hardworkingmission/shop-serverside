const { trusted } = require('mongoose');
const { Cart } = require('../models/Cart');

//all carts
const allCarts = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Cart.find({});
    const sortedResult = result.map(item=>{
      if(item.userId == userId){
        return item
      }
    })
    res.status(200).json(sortedResult);
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
    const userId = req.user.id;
    const cartExist = await Cart.findOne({userId});
    if(cartExist){
      const productExist = await Cart.find({$and:[{userId}, {"products.productId": cartInfo.productId}]});
      if(productExist.length>0){
        const result = productExist[0].products.map(product=>{
          if(product.productId == cartInfo.productId){
            product.quantity += cartInfo.quantity;
          }
          return product;
        }).filter(product=>product.productId==cartInfo.productId);
        
        const deResult = await Cart.findOne({userId, "products.productId": cartInfo.productId});
        deResult.products.filter(product => product.productId == cartInfo.productId)[0].quantity = result[0].quantity;
        deResult.save()
        return res.status(200).json(deResult);
        
      }else{
        cartExist.products.push(cartInfo);
        const result = await Cart.updateOne({userId}, cartExist);
        return res.status(200).json(result);
      }

    }
    const result = await Cart.create({userId, products:cartInfo});
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

const removeCartItem = async(req, res)=>{
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const result = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true });
    return res.status(200).json({result, "Matched" : 1, "Modified" : 1 });

    
  } catch (err) {
    console.log(err?.message)
    res.status(500).json(err?.message);
  }

}

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
module.exports = { allCarts, singleCart, createCart, updateCart, deleteCart, removeCartItem };

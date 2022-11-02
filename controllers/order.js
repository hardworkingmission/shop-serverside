const { Order } = require('../models/Order');

//all carts
const allOrders = async (req, res) => {
  try {
    const result = await Order.find({});
    res.status(400).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//get a single order by user
const singleUserOrder = async (req, res) => {
  try {
    const userId = req.params?.id;
    const result = await Order.find({ userId });
    res.status(400).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//create a order
const createOrder = async (req, res) => {
  try {
    const orderInfo = req?.body;
    const result = await Order.create(orderInfo);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//update a order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params?.id;
    const result = await Cart.findByIdAndUpdate(
      orderId,
      { $set: req?.body },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params?.id;
    const result = await Cart.findByIdAndDelete(orderId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//income statistic
const incomeStat = async (req, res) => {
  console.log('stat');
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};
module.exports = {
  allOrders,
  singleUserOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  incomeStat,
};

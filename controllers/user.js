const { User } = require('../models/User');
const cryptoJS = require('crypto-js');

//get all users
const allUsers = async (req, res) => {
  try {
    const newUser = req.query?.new;
    const users = newUser
      ? await User.find({}).sort({ _id: -1 }).limit(5)
      : await User.find({});
    res.status(400).json(users);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//user Statistics
const userStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    console.log('stats');
    const result = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//update a user
const updateUser = async (req, res) => {
  //console.log('Inupdate');
  if (req.body.password) {
    req.body.password = cryptoJS.AES.encrypt(
      req.body?.password,
      process.env.PASSWORD_SECRETE
    ).toString();
  }
  try {
    const updateUser = await User?.findByIdAndUpdate(
      req.params?.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//get a user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params?.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

//delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params?.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

module.exports = { updateUser, allUsers, deleteUser, getSingleUser, userStats };

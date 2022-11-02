const { User } = require('../models/User');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  const result = await User.find({});
  res.send(result);
};
const registerUser = async (req, res) => {
  const userInfo = {
    username: req?.body?.username,
    email: req?.body?.email,
    password: cryptoJS.AES.encrypt(
      req?.body?.password,
      process.env.PASSWORD_SECRETE
    ).toString(),
  };
  try {
    const result = await User.create(userInfo);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err?.message);
  }
};

const loginUser = async (req, res) => {
  const userInfo = req?.body;
  try {
    const user = await User.findOne({ username: userInfo?.username });
    if (!user) {
      res.status(401).json('Wrong cridential');
    }
    const hasedPassword = cryptoJS.AES.decrypt(
      user?.password,
      process.env.PASSWORD_SECRETE
    );
    if (hasedPassword.toString(cryptoJS.enc.Utf8) !== userInfo?.password) {
      res.status(401).json('Wrong password');
    }
    const accessToken = jwt.sign(
      { id: user?._id, isAdmin: user?.isAdmin },
      process.env.SECRETE_KEY,
      { expiresIn: '2d' }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(404).json(err?.message);
  }
};

module.exports = { getAllUsers, registerUser, loginUser };

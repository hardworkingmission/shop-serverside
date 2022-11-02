const express = require('express');
const { getAllUsers, registerUser, loginUser } = require('../controllers/auth');
const router = express.Router();

router.route('/register').get(getAllUsers).post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;

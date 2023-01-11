const express = require('express');
const { getAllUsers, registerUser, loginUser, resetPasswprd } = require('../controllers/auth');
const router = express.Router();

router.route('/signup').get(getAllUsers).post(registerUser);
router.route('/login').post(loginUser);
router.route('/resetpassword').post(resetPasswprd);

module.exports = router;

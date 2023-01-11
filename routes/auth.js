const express = require('express');
const { getAllUsers, registerUser, loginUser, resetPassword, makeAdmin } = require('../controllers/auth');
const router = express.Router();

router.route('/signup').get(getAllUsers).post(registerUser);
router.route('/login').post(loginUser);
router.route('/resetpassword').post(resetPassword);
router.route('/makeadmin').post(makeAdmin);

module.exports = router;

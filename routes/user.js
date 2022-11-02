const express = require('express');
const {
  updateUser,
  allUsers,
  deleteUser,
  getSingleUser,
  userStats,
} = require('../controllers/User');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const router = express.Router();

router.route('/stats').get(verifyTokenAndAdmin, userStats);
router.route('/').get(verifyTokenAndAdmin, allUsers);
router
  .route('/:id')
  .get(verifyTokenAndAdmin, getSingleUser)
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, verifyTokenAndAdmin, deleteUser);

module.exports = router;

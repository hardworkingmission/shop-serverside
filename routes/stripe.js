const { paymentOnStripe } = require('../controllers/stripe');

const router = require('express').Router();

router.route('/payment').post(paymentOnStripe);

module.exports = router;

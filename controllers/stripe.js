const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);

const paymentOnStripe = async (req, res) => {
  const { tokenId, amount } = req?.body;
  await stripe.charges.create(
    {
      source: tokenId,
      amount: amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

module.exports = { paymentOnStripe };

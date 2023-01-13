const express = require('express');
const app = express();
const cors = require('cors');
const { connectdb } = require('./connectdb/connectdb');
const port = process.env.PORT || 8000;
const auth = require('./routes/auth');
const user = require('./routes/user');
const products = require('./routes/product');
const carts = require('./routes/cart');
const orders = require('./routes/order');
const payment = require('./routes/stripe');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/products', products);
app.use('/api/carts', carts);
app.use('/api/orders', orders);
app.use('/api/stripe', payment);

app.get('/', async (req, res) => {
  res.send('Welcome to our shop');
});

const start = () => {
  try {
    connectdb();
  } catch (err) {
    console.log(err);
  }
};
start();
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;

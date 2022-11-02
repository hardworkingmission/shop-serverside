const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = `mongodb+srv://${process.env.USER_ID}:${process.env.PASSWORD}@cluster0.tl4jq1n.mongodb.net/shopdb?retryWrites=true&w=majority`;

const connectdb = async () => {
  await mongoose
    .connect(connectionString)
    .then(() => console.log('Connected'))
    .catch((err) => console.log('Connection error:', err?.message));
};

module.exports = { connectdb };

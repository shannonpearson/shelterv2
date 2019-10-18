const mongoose = require('mongoose');

const connectDb = () => mongoose.connect(process.env.DATABASE_URL);

module.exports = connectDb;

const mongoose = require('mongoose');
const User = require('./user');

const connectDb = () => mongoose.connect(process.env.DATABASE_URL);

const models = { User };

module.exports = { models, connectDb };

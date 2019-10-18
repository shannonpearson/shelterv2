const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.findByUsername = async function (login) {
  const user = await this.findOne({ username: login });
  return user;
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '',
  },
  sex: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  breed: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    data: Buffer,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

petSchema.statics.getAll = async function () {
  const pets = await this.find({});
  return pets;
};

petSchema.statics.findById = async function (_id) {
  const pet = await this.findOne({ _id });
  return pet;
};

const Pet = mongoose.model('Pet', petSchema, 'pets');

module.exports = Pet;

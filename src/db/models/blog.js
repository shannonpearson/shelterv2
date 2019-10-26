const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  body: {
    type: String,
    default: '',
    required: true,
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

blogSchema.statics.getAll = async function () {
  const blogs = await this.find({}).sort({ createdOn: -1 });
  return blogs;
};

blogSchema.statics.getPage = async function (page) {
  const blogs = await this.find({}).sort({ createdOn: -1 }).limit(10)
    .skip(10 * page);
  return blogs;
};

const Blog = mongoose.model('Blog', blogSchema, 'blogs');

module.exports = Blog;

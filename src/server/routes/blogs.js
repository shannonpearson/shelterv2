const { Router } = require('express');

const Blog = require('../../db/models/blog');

const router = Router();

router.get('/all', async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.status(200).send({ success: true, blogs });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error fetching blogs' });
  }
});

router.get('/next', async (req, res) => {
  try {
    const { page } = req.query;
    const blogs = await Blog.getPage(page);
    res.status(200).send({ success: true, blogs });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error fetching blogs' });
  }
});

module.exports = router;

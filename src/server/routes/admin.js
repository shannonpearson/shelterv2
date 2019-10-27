const { Router } = require('express');
const Pet = require('../../db/models/pet');
const Blog = require('../../db/models/blog');
const Event = require('../../db/models/event');

const router = Router();


/* AUTHENTICATION */
router.get('/access', (req, res) => {
  // middleware checks token
  // if token is invalid, this route is never reached
  // if this route is reached, token has been validated
  res.status(200).send({ success: true, message: 'Authorized' });
});

/* PETS ADMIN */
router.post('/pets', async (req, res) => {
  try {
    const {
      name = '', sex = '', age = '', breed = '', bio = '', image,
    } = req.body.pet;
    const newPetObject = {
      name, sex, age, breed, bio, image,
    };
    const pet = new Pet(newPetObject);

    pet.save((err) => {
      if (err) {
        return err;
      }
      return null;
    });
    res.status(200).send({ success: true, result: pet });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error creating new pet' });
  }
});

router.put('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { pet = {} } = req.body;
    if (id) {
      Pet.updateOne({ _id: id }, pet, (err) => {
        if (err) {
          res.status(400).send({ success: false });
        } else {
          res.status(200).send({ success: true, result: pet });
        }
      });
    } else {
      res.status(400).send({ success: false, message: 'Missing document ID' });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error updating pet' });
  }
});

router.delete('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      Pet.deleteOne({ _id: id }, (err) => {
        if (err) {
          res.status(400).send({ success: false });
        } else {
          res.status(200).send({ success: true });
        }
      });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error deleting pet' });
  }
});

/* BLOGS ADMIN */
router.post('/blogs', (req, res) => {
  try {
    const {
      title, body, image = null,
    } = req.body.blog;
    const newBlogObject = {
      title, body, image,
    };
    const blog = new Blog(newBlogObject);

    blog.save((err) => {
      if (err) {
        return err;
      }
      return null;
    });
    res.status(200).send({ success: true, result: blog });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error creating new blog post' });
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { blog = {} } = req.body;
    if (id) {
      Blog.updateOne({ _id: id }, blog, (err) => {
        if (err) {
          res.status(400).send({ success: false });
        } else {
          res.status(200).send({ success: true, result: blog });
        }
      });
    } else {
      res.status(400).send({ success: false, message: 'Missing document ID' });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error updating blog post' });
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      Blog.deleteOne({ _id: id }, (err) => {
        if (err) {
          res.status(400).send({ success: false });
        } else {
          res.status(200).send({ success: true });
        }
      });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error deleting blog post' });
  }
});


/* EVENTS ADMIN */
router.post('/events', (req, res) => {
  console.log('post event');
  try {
    const {
      title, description, startDate, endDate,
    } = req.body.event;
    const newEventObject = {
      title, description, startDate, endDate,
    };
    const event = new Event(newEventObject);

    event.save((err) => {
      if (err) {
        return err;
      }
      return null;
    });
    res.status(200).send({ success: true, result: event });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error creating new event' });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { event = {} } = req.body;
    if (id) {
      Event.updateOne({ _id: id }, event, (err) => {
        if (err) {
          res.status(400).send({ success: false });
        } else {
          res.status(200).send({ success: true, result: event });
        }
      });
    } else {
      res.status(400).send({ success: false, message: 'Missing document ID' });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error updating event' });
  }
});


router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      Event.deleteOne({ _id: id }, (err) => {
        if (err) {
          res.status(400).send({ success: false });
        } else {
          res.status(200).send({ success: true });
        }
      });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error deleting event' });
  }
});

module.exports = router;

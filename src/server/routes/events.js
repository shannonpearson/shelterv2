const { Router } = require('express');

const Event = require('../../db/models/event');

const router = Router();

router.get('/all', async (req, res) => {
  try {
    const events = await Event.getAll();
    res.status(200).send({ success: true, events });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error fetching events' });
  }
});

module.exports = router;

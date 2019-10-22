const { Router } = require('express');

const Pet = require('../../db/models/pet');

const router = Router();

router.get('/all', async (req, res) => {
  try {
    const pets = await Pet.getAll();
    res.status(200).send({ success: true, pets });
  } catch (err) {
    res.status(400).send({ success: false, message: 'Error fetching pets' });
  }
});

module.exports = router;

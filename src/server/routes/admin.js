const { Router } = require('express');
const Pet = require('../../db/models/pet');


const router = Router();

router.get('/access', (req, res) => {
  // middleware checks token
  // if token is invalid, this route is never reached
  // if this route is reached, token has been validated
  res.status(200).send({ success: true, message: 'Authorized' });
});

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
  console.log('PUT');
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
    res.status(400).send({ success: false, message: 'Error creating new pet' });
  }
});

module.exports = router;

const { Router } = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../db/models/user');

const router = Router();

const secret = process.env.SECRET;

// checks whether request contains a valid token - validate JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ success: false, message: 'Missing username or password.' });
    }

    const formattedUsername = username.toLowerCase();
    const retrievedUser = await User.findByUsername(formattedUsername);
    if (!retrievedUser) {
      return res.status(400).send({ success: false, message: 'Username not found' });
    }
    return bcrypt.compare(password, retrievedUser.password, (err, valid) => {
      if (!err && valid) {
        return jwt.sign({ username }, secret, { expiresIn: '24h' }, (jwtError, token) => {
          if (jwtError) {
            return res.status(403).send({ success: false, message: 'Failed to authenticate' });
          }
          return res.status(200).send({ success: true, token, message: 'Successfully authenticated with token' });
        });
      }
      return res.status(400).send({ success: false, message: 'Invalid password' });
    });
  } catch (err) {
    return res.status(400);
  }
});

module.exports = router;

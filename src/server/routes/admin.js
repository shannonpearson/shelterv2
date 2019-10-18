const { Router } = require('express');


const router = Router();


router.get('/access', (req, res) => {
  // middleware checks token
  // if token is invalid, this route is never reached
  // if this route is reached, token has been validated
  console.log('ACCESS');
  res.status(200).send({ success: true, message: 'Authorized' });
});

// routes for adding to db

module.exports = router;

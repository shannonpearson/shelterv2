const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  try {
    console.log('health');
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
});

module.exports = router;

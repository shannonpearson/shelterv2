const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(400);
  }
});

module.exports = router;

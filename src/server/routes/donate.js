const { Router } = require('express');

const Stripe = require('stripe');

const router = Router();

router.post('/stripe', async (req, res) => {
  try {
    const {
      description, source, currency, amount, email,
    } = req.body;
    const stripeSecretKey = 'sk_test_e35zPWZE5mjOCOArG9amIpfw';
    const stripe = Stripe(stripeSecretKey);
    stripe.charges.create(
      {
        amount,
        currency,
        source,
        description,
        statement_descriptor: 'E Haven Animal Shelter',
        receipt_email: email,
      },
      (err, charge) => {
        if (err) {
          res.status(400).send({ message: 'charge error' });
        } else {
          res.status(200).send({ message: 'charge success!', charge });
        }
      },
    );
    res.status(200);
  } catch (err) {
    res.status(404);
  }
});

module.exports = router;

/* eslint-disable no-alert */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

const CURRENCY = 'USD';

const fromDollarToCent = (amount) => amount * 100;

const successPayment = () => {
  alert('Payment Successful');
};

const errorPayment = () => {
  alert('Payment Error');
};

const onToken = (amount, description) => (token) => {
  console.log('ON TOKEN');
  return fetch('/donate/stripe', {
    method: 'POST',
    body: {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount),
      email: token.email,
    },
  })
    .then(successPayment)
    .catch(errorPayment);
};

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey="pk_test_B53wtYSwYahl6uN31pH9pyZ2"
  />
);

Checkout.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
};

Checkout.defaultProps = {
  name: '',
  description: '',
  amount: 0,
};

export default Checkout;

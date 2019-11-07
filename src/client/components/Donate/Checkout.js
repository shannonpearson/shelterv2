/* eslint-disable no-alert */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';
import { unauthenticatedFetch } from '../../utils/fetchUtils';

const CURRENCY = 'USD';

const fromDollarToCent = (amount) => amount * 100;

const successPayment = () => {
  alert('Payment Successful');
};

const errorPayment = () => {
  alert('Payment Error');
};

const onToken = (amount, description) => (token) => unauthenticatedFetch('/donate/stripe', {
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

const Checkout = ({
  amount, description, closed, className,
}) => (
  <StripeCheckout
    name="East Haven Animal Shelter"
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    panelLabel="Donate"
    closed={closed}
    className={className}
    currency={CURRENCY}
    stripeKey="pk_live_d4UnYyBWLDBenLC7wAJIlawN"
  />
);

Checkout.propTypes = {
  closed: PropTypes.func,
  description: PropTypes.string,
  amount: PropTypes.number,
  className: PropTypes.string,
};

Checkout.defaultProps = {
  closed: null,
  description: '',
  amount: 0,
  className: '',
};

export default Checkout;

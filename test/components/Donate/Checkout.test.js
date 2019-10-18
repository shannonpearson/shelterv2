import React from 'react';
import { shallow } from 'enzyme';

const CheckoutComponent = require('../../../src/client/components/Donate/Checkout').default;

describe('Checkout', () => {
  test('exists', () => {
    // Assert
    expect(CheckoutComponent).toBeDefined();
  });
  test('mounts', () => {
    // Arrange
    const wrapper = shallow(<CheckoutComponent />);
    // Assert
    expect(wrapper.html()).toBeDefined();
  });
});

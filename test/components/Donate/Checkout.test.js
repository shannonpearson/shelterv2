import React from 'react';
import { shallow } from 'enzyme';

import { unauthenticatedFetch } from '../../../src/client/utils/fetchUtils';

const mockUnauthenticatedFetch = jest.fn(() => Promise.resolve({}));

jest.mock('../../../src/client/utils/fetchUtils', () => ({
  unauthenticatedFetch: jest.fn(),
}));


const CheckoutComponent = require('../../../src/client/components/Donate/Checkout').default;

describe('Checkout', () => {
  beforeEach(() => {
    unauthenticatedFetch.mockImplementation(mockUnauthenticatedFetch);
  });
  describe('render', () => {
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
  describe('callbacks', () => {
    let spy;
    afterEach(() => {
      spy.mockClear();
    });
    test('alerts payment successful on success', () => {
      // Arrange
      spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const wrapper = shallow(<CheckoutComponent />);

      // Act
      const resultPromise = wrapper.props().token(1, '');

      // Assert
      return resultPromise.then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith('Payment Successful');
      });
    });
    test('alerts payment error on error', () => {
      // Arrange
      unauthenticatedFetch.mockImplementation(() => Promise.reject(new Error()));

      spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const wrapper = shallow(<CheckoutComponent />);

      // Act
      const resultPromise = wrapper.props().token(1, '');

      // Assert
      return resultPromise.then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith('Payment Error');
      });
    });
  });
});

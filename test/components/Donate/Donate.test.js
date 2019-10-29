/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';

const DonateComponent = require('../../../src/client/components/Donate/Donate').default;

describe('Donate', () => {
  describe('render', () => {
    test('exists', () => {
      // Assert
      expect(DonateComponent).toBeDefined();
    });
    test('mounts', () => {
      // Arrange
      const wrapper = shallow(<DonateComponent />);
      // Assert
      expect(wrapper.html()).toBeDefined();
    });
    test('renders checkout', () => {
      // Arrange
      const wrapper = shallow(<DonateComponent />);
      // Assert
      expect(wrapper.find('Checkout').length).toEqual(1);
    });
  });
  describe('currency input', () => {
    test('sets amount to correct value in state on change', () => {
      // Arrange
      const wrapper = shallow(<DonateComponent />);
      // Act
      wrapper.find('CurrencyInput').props().onChangeEvent({}, '1.23', 1.23);
      // Assert
      expect(wrapper.find('CurrencyInput').props().value).toEqual(1.23);
    });
  });
  describe('checkout', () => {
    test('amount is set by currency input', () => {
      // Arrange
      const wrapper = shallow(<DonateComponent />);
      // Act
      wrapper.find('CurrencyInput').props().onChangeEvent({}, '3.21', 3.21);
      // Assert
      expect(wrapper.find('Checkout').props().amount).toEqual(3.21);
    });
    test('resets amount to zero when closed', () => {
      // Arrange
      const wrapper = shallow(<DonateComponent />);
      // Act
      wrapper.find('CurrencyInput').props().onChangeEvent({}, '6.66', 6.66);
      wrapper.find('Checkout').props().closed();
      // Assert
      expect(wrapper.find('Checkout').props().amount).toEqual(0);
    });
  });
});

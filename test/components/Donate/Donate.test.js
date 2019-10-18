import React from 'react';
import { shallow } from 'enzyme';

const DonateComponent = require('../../../src/client/components/Donate/Donate').default;

describe('Donate', () => {
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
});

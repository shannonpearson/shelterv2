import React from 'react';
import { shallow } from 'enzyme';

const FooterComponent = require('../../../src/client/components/Footer').default;

describe('Footer', () => {
  test('exists', () => {
    // Assert
    expect(FooterComponent).toBeDefined();
  });
  test('mounts', () => {
    // Arrange
    const wrapper = shallow(<FooterComponent />);
    // Assert
    expect(wrapper.html()).toBeDefined();
  });
});

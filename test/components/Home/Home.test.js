import React from 'react';
import { shallow } from 'enzyme';

const HomeComponent = require('../../../src/client/components/Home').default;

describe('Home', () => {
  test('exists', () => {
    // Assert
    expect(HomeComponent).toBeDefined();
  });
  test('mounts', () => {
    // Arrange
    const wrapper = shallow(<HomeComponent />);
    // Assert
    expect(wrapper.html()).toBeDefined();
  });
});

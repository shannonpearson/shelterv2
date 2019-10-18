import React from 'react';
import { shallow } from 'enzyme';

const RouterComponent = require('../../../src/client/Router').default;
const NavigationComponent = require('../../../src/client/components/Navigation').default;

describe('Router', () => {
  test('exists', () => {
    // Assert
    expect(RouterComponent).toBeDefined();
  });
  test('mounts', () => {
    // Arrange
    const wrapper = shallow(<RouterComponent />);
    // Assert
    expect(wrapper.html()).toBeDefined();
  });
});
describe('Navigation', () => {
  test('exists', () => {
    // Assert
    expect(NavigationComponent).toBeDefined();
  });
  test('mounts', () => {
    // Arrange
    const wrapper = shallow(<RouterComponent />);
    // Assert
    expect(wrapper.find('Navigation').length).toEqual(1);
  });
});

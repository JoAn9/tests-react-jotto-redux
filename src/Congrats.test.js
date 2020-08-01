import React from 'react';
import { shallow } from 'enzyme';
import Congrats from './Congrats';

const setup = (props = {}) => {
  const wrapper = shallow(<Congrats {...props} />);
  return wrapper;
};

test('renders without error when success is true', () => {
  const wrapper = setup({ success: true });
  const component = wrapper.find('[data-test="component-congrats"]');
  expect(component.length).toBe(1);
  expect(component.text().length).not.toBe(0);
});
test('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  const component = wrapper.find('[data-test="component-congrats"]');
  expect(component.length).toBe(0);
});

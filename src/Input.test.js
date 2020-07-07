import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';
import { storeFactory } from '../test/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  // console.log(wrapper.debug());
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = wrapper.find('[data-test="component-input"]');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = wrapper.find('[data-test="input-box"]');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = wrapper.find('[data-test="submit-button"]');
      expect(submitButton.length).toBe(1);
    });
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });
    test('renders component without error', () => {
      const component = wrapper.find('[data-test="component-input"]');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = wrapper.find('[data-test="input-box"]');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submitButton = wrapper.find('[data-test="input-box"]');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('update state', () => {});

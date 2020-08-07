import React from 'react';
import { shallow } from 'enzyme';
import FailureMsg, { _FailureMsg } from './FailureMsg';
import { storeFactory } from '../test/testUtils';

const secretWord = 'scrum';
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<FailureMsg store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('test FailureMsg component when `giveUp` is true', () => {
  let component;
  beforeEach(() => {
    const wrapper = setup({ giveUp: true, secretWord });
    component = wrapper.find('[data-test="component-failure-msg"]');
  });
  test('component `FailureMsg` renders without error when `giveUp` is true', () => {
    expect(component.length).toBe(1);
    expect(component.text()).not.toBe('');
  });
  test('renders message containing secret word when `giveUp` is true', () => {
    expect(component.text()).toContain(secretWord);
  });
});

test('component `FailureMsg` does not render when `giveUp` is false', () => {
  const wrapper = setup({ giveUp: false });
  const component = wrapper.find('[data-test="component-failure-msg"]');
  expect(component.length).toBe(0);
});

import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import { storeFactory } from '../test/testUtils';
import NewWord, { _NewWord } from './NewWord';
import { getSecretWord } from './actions';

const defaultProps = { success: true };

describe('newWord component', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory({ ...defaultProps, ...initialState });
    const wrapper = shallow(<NewWord store={store} />)
      .dive()
      .dive();
    return wrapper;
  };
  test('NewWord button renders without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-new-word"]');
    expect(component.length).toBe(1);
  });
  test('NewWord button is displayed after sucessful guess', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-new-word"]');
    expect(component.length).toBe(1);
  });
  test('NewWord button is not displayed when `success` is false', () => {
    const success = false;
    const wrapper = setup({ success });
    const component = wrapper.find('[data-test="component-new-word"]');
    expect(component.length).toBe(0);
  });
});

test('`resetGame` is called once on click', () => {
  const mockResetGame = jest.fn();
  const props = {
    resetGame: mockResetGame,
  };
  const wrapper = shallow(<_NewWord {...defaultProps} {...props} />);
  const buttonNewWord = wrapper.find('[data-test="component-new-word"]');
  buttonNewWord.simulate('click');
  expect(mockResetGame).toHaveBeenCalledTimes(1);
});

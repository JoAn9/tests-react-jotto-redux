import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory } from './../test/testUtils';
import App from './App';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive();
  return wrapper;
};

describe('test redux properties', () => {
  test('`getSecretWord` action is a function', () => {
    const wrapper = setup();
    expect(wrapper.props().getSecretWord).toBeInstanceOf(Function);
  });
  test('App has access to `success` piece of state from redux', () => {
    const success = true;
    const wrapper = setup({ success });
    expect(wrapper.props().success).toBe(success);
  });
  test('App has access to `secretWord` state', () => {
    const secretWord = 'beer';
    const wrapper = setup({ secretWord });
    expect(wrapper.props().secretWord).toBe(secretWord);
  });
  test('App has access to `guessedWords` from redux', () => {
    const guessedWords = [{ guessedWord: 'beer', lettersMatch: 1 }];
    const wrapper = setup({ guessedWords });
    expect(wrapper.props().guessedWords).toEqual(guessedWords);
  });
});
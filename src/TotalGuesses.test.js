import React from 'react';
import { shallow } from 'enzyme';
import TotalGuesses from './TotalGuesses';
import { storeFactory } from '../test/testUtils';

describe('TotalGuesses component renders without errors', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<TotalGuesses store={store} />)
      .dive()
      .dive();
    return wrapper;
  };
  const guessedWords = [
    { guessedWord: 'beer', lettersMatch: 1 },
    { guessedWord: 'juice', lettersMatch: 0 },
  ];

  test('Component is renders without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-total-guesses"]');
    expect(component.length).toBe(1);
    expect(component.text()).not.toBe('');
  });
  test('Number of total guesses is displayed correctly', () => {
    const wrapper = setup({ guessedWords });
    const component = wrapper.find('[data-test="component-total-guesses"]');
    expect(component.text()).toContain(guessedWords.length);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import GuessedWords from './GuessedWords';

const setup = (props = {}) => {
  const wrapper = shallow(<GuessedWords {...props} />);
  return wrapper;
};

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test('renders without error', () => {
    const component = wrapper.find('[data-test="component-guessedWords"]');
    expect(component.length).toBe(1);
  });
  test('renders instructions to guess a word', () => {
    const instructions = wrapper.find('[data-test="instructions"]');
    expect(instructions.text().length).not.toBe(0);
  });
});
describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'beer', lettersMatch: 1 },
    { guessedWord: 'wine', lettersMatch: 0 },
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });
  test('renders without error', () => {
    const component = wrapper.find('[data-test="component-guessedWords"]');
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const table = wrapper.find('[data-test="table-guessedWords"]');
    expect(table.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    const row = wrapper.find('[data-test="table-row"]');
    expect(row.length).toBe(guessedWords.length);
  });
  test('renders correct index for each guessed word in row', () => {
    const rowIndexes = wrapper.find('[data-test="guessed-word-index"]');
    const rowIndexSet = new Set(rowIndexes.map(item => item.text()));
    const expectedSet = new Set(
      guessedWords.map((item, index) => String(index + 1))
    );
    expect(rowIndexSet).toEqual(expectedSet);
  });
});

import { storeFactory } from '../test/testUtils';
import { guessWord } from './actions/index';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const notCorrectGuess = 'train';

  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test('update state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(notCorrectGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          {
            guessedWord: notCorrectGuess,
            lettersMatch: 3,
          },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
    test('update state correctly for successful guess', () => {});
  });

  describe('some guessed words', () => {
    test('update state correctly for unsuccessful guess', () => {});
    test('update state correctly for successful guess', () => {});
  });
});

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
    test('update state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          {
            guessedWord: secretWord,
            lettersMatch: 5,
          },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'scrum', lettersMatch: 1 }];
    const initialState = { guessedWords, secretWord };
    let store;
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
          ...guessedWords,
          { guessedWord: notCorrectGuess, lettersMatch: 3 },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
    test('update state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          ...guessedWords,
          { guessedWord: secretWord, lettersMatch: 5 },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });
});

import { getLettersMatch } from '../helpers';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
};

export const guessWord = guessedWord => {
  return function(dispatch, getState) {
    const { CORRECT_GUESS, GUESS_WORD } = actionTypes;
    const secretWord = getState().secretWord;
    const lettersMatch = getLettersMatch(guessedWord, secretWord);
    dispatch({
      type: GUESS_WORD,
      payload: { guessedWord, lettersMatch },
    });

    if (guessedWord === secretWord) {
      dispatch({
        type: CORRECT_GUESS,
      });
    }
  };
};

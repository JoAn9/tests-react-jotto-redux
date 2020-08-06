import { getLettersMatch } from '../helpers';
import axios from 'axios';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
  GIVE_UP: 'GIVE_UP',
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

export const getSecretWord = () => async dispatch => {
  const response = await axios.get('http://localhost:3030');
  // const response = { data: 'party' };
  dispatch({
    type: actionTypes.SET_SECRET_WORD,
    payload: response.data,
  });
};

export const resetGame = () => dispatch => {
  dispatch(getSecretWord());
  dispatch({
    type: actionTypes.RESET_GAME,
  });
};

export const giveUp = () => dispatch => {
  dispatch({
    type: actionTypes.GIVE_UP,
  });
};

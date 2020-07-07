import successReducer from './successReducer';
import { actionTypes } from '../actions';

test('returns default initial state of `false` when no action is passed', () => {
  const state = successReducer(undefined, {});
  expect(state).toBe(false);
});

test('returns state of true upon receiving an action of type `correct_guess', () => {
  const state = successReducer(undefined, { type: actionTypes.CORRECT_GUESS });
  expect(state).toBe(true);
});

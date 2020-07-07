export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
};

export function correctGuess() {
  const { CORRECT_GUESS } = actionTypes;
  return { type: CORRECT_GUESS };
}

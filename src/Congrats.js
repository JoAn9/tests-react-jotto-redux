import React from 'react';

function Congrats({ success }) {
  if (!success) return null;

  const content = "Congrats, you've guessed the secret word.";
  return <div data-test="component-congrats">{content}</div>;
}

export default Congrats;

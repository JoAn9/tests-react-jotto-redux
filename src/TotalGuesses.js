import React from 'react';
import { connect } from 'react-redux';

function TotalGuesses({ guessedWords }) {
  return (
    <div data-test="component-total-guesses">
      Total Guesses: {guessedWords.length}
    </div>
  );
}

const mapStateToProps = store => ({
  guessedWords: store.guessedWords,
});

export default connect(mapStateToProps)(TotalGuesses);

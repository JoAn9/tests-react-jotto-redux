import React from 'react';
import PropTypes from 'prop-types';

function GuessedWords({ guessedWords }) {
  const content =
    guessedWords.length > 0 ? (
      <table data-test="table-guessedWords" className="table table-sm">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Guess</th>
            <th>Matching Letters</th>
          </tr>
        </thead>
        <tbody>
          {guessedWords.map((word, index) => (
            <tr data-test="table-row" key={index}>
              <td data-test="guessed-word-index">{index + 1}</td>
              <td>{word.guessedWord}</td>
              <td>{word.lettersMatch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <span data-test="instructions">Try to guess the secret word!</span>
    );
  return <div data-test="component-guessedWords">{content}</div>;
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      lettersMatch: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GuessedWords;

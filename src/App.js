import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';
import TotalGuesses from './TotalGuesses';

export function _App({ getSecretWord, success, guessedWords }) {
  React.useEffect(() => {
    getSecretWord();
  }, [getSecretWord]);
  return (
    <div className="container">
      <h1>Jotto</h1>
      <Input />
      <Congrats success={success} />
      <GuessedWords guessedWords={guessedWords} />
      <TotalGuesses />
    </div>
  );
}

const mapStateToProps = store => ({
  success: store.success,
  secretWord: store.secretWord,
  guessedWords: store.guessedWords,
});

export default connect(mapStateToProps, { getSecretWord })(_App);

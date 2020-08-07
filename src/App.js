import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';
import TotalGuesses from './TotalGuesses';
import NewWord from './NewWord';
import FailureMsg from './FailureMsg';

export function _App({ getSecretWord, success, guessedWords, secretWord }) {
  React.useEffect(() => {
    getSecretWord();
  }, [getSecretWord]);
  return (
    <div className="container">
      <h1>Jotto</h1>
      <FailureMsg />
      <Input />
      <Congrats success={success} />
      <NewWord />
      <GuessedWords guessedWords={guessedWords} />
      <TotalGuesses />
      <h6 className="small">Secret word is: {secretWord}</h6>
    </div>
  );
}

const mapStateToProps = store => ({
  success: store.success,
  secretWord: store.secretWord,
  guessedWords: store.guessedWords,
});

export default connect(mapStateToProps, { getSecretWord })(_App);

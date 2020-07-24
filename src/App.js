import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from './actions';

function App() {
  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Input success={success} />
      <Congrats />
      <GuessedWords />
    </div>
  );
}

const mapStateToProps = store => ({
  success: store.success,
  secretWord: store.secretWord,
  guessedWords: store.guessedWords,
});

export default connect(mapStateToProps, { getSecretWord })(App);

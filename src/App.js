import React from 'react';
import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';

function App() {
  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Input />
      <Congrats />
      <GuessedWords />
    </div>
  );
}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { guessWord, giveUp } from './actions';

// can not use instance() for functional component (enzyme);
// instance() returns null for stateless functional components
// can use props() instead, for functional components

export function _Input({ success, guessWord, giveUp }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const giveUpHandler = e => {
    e.preventDefault();
    giveUp();
  };
  const submitHandler = e => {
    e.preventDefault();
    guessWord(currentGuess);
    setCurrentGuess('');
  };
  const content = success ? null : (
    <form className="form-inline">
      <input
        data-test="input-box"
        className="mb-2 mx-sm-3"
        type="text"
        placeholder="enter guess"
        value={currentGuess}
        onChange={e => setCurrentGuess(e.target.value)}
      />
      <button
        data-test="submit-button"
        className="btn btn-primary mb-2"
        type="submit"
        onClick={submitHandler}
      >
        Submit
      </button>
      <button
        data-test="component-give-up"
        className="btn btn-danger mb-2"
        onClick={giveUpHandler}
      >
        Give Up
      </button>
    </form>
  );

  return <div data-test="component-input">{content}</div>;
}

const mapStateToProps = ({ success }) => ({ success });

export default connect(mapStateToProps, { guessWord, giveUp })(_Input);

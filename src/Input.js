import React from 'react';
import { connect } from 'react-redux';
import { guessWord, giveUp as giveUpAction } from './actions';

// for functional component, can not use instance() from enzyme;
// instance() returns null for stateless functional components
// for functional components, can use props() instead

export function _Input({ success, guessWord, giveUpAction, giveUp }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const giveUpHandler = e => {
    e.preventDefault();
    giveUpAction();
  };
  const submitHandler = e => {
    e.preventDefault();
    guessWord(currentGuess);
    setCurrentGuess('');
  };
  const content =
    success || giveUp ? null : (
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

const mapStateToProps = ({ success, giveUp }) => ({
  success,
  giveUp,
});

export default connect(mapStateToProps, { guessWord, giveUpAction })(_Input);

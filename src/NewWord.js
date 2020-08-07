import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetGame } from './actions';

export function _NewWord({ success, resetGame, giveUp }) {
  if (!success && !giveUp) return null;
  return (
    <button
      data-test="component-new-word"
      className="btn btn-primary spacer-bottom"
      onClick={resetGame}
    >
      New Word
    </button>
  );
}

_NewWord.propTypes = {
  success: PropTypes.bool.isRequired,
  resetGame: PropTypes.func.isRequired,
  giveUp: PropTypes.bool,
};

const mapStateToProps = store => ({
  success: store.success,
  giveUp: store.giveUp,
});

export default connect(mapStateToProps, { resetGame })(_NewWord);

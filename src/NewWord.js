import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetGame } from './actions';

export function _NewWord({ success, resetGame }) {
  if (!success) return null;
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
};

const mapStateToProps = store => ({
  success: store.success,
});

export default connect(mapStateToProps, { resetGame })(_NewWord);

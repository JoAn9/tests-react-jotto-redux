import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export function _FailureMsg({ giveUp, secretWord }) {
  if (!giveUp) return null;
  return (
    <div data-test="component-failure-msg">
      <div className="alert alert-danger">
        The secret word was {secretWord}. <br /> Try again!
      </div>
    </div>
  );
}

const mapStateToProps = store => ({
  giveUp: store.giveUp,
  secretWord: store.secretWord,
});

export default connect(mapStateToProps, null)(_FailureMsg);

_FailureMsg.propTypes = {
  giveUp: PropTypes.bool,
  success: PropTypes.bool,
};

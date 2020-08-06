import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function FailureMsg({ giveUp, secretWord }) {
  if (!giveUp) return null;
  return (
    <div className="alert alert-danger" data-test="component-failure-msg">
      The secret word was {secretWord}. Try again later.
    </div>
  );
}

const mapStateToProps = store => ({
  giveUp: store.giveUp,
  secretWord: store.secretWord,
});

export default connect(mapStateToProps, null)(FailureMsg);

FailureMsg.propTypes = {
  giveUp: PropTypes.bool.isRequired,
  success: PropTypes.bool,
};

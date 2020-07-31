import React from 'react';
import { connect } from 'react-redux';
import { guessWord } from './actions';

// can not use functional component, if want to use instance() from enzyme;
// instance() returns null for stateless functional components
// can use props() instead, for functional components

// export class _Input extends React.Component {
//   render() {
//     const content = this.props.success ? null : (
//       <form className="form-inline">
//         <input
//           data-test="input-box"
//           className="mb-2 mx-sm-3"
//           type="text"
//           placeholder="enter guess"
//         />
//         <button
//           data-test="submit-button"
//           className="btn btn-primary mb-2"
//           type="submit"
//           onClick={() => this.props.guessWord()}
//         >
//           Submit
//         </button>
//       </form>
//     );

//     return <div data-test="component-input">{content}</div>;
//   }
// }

export function _Input({ success, guessWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
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
        onClick={e => {
          e.preventDefault();
          guessWord(currentGuess);
        }}
      >
        Submit
      </button>
    </form>
  );

  return <div data-test="component-input">{content}</div>;
}

const mapStateToProps = ({ success }) => ({ success });

export default connect(mapStateToProps, { guessWord })(_Input);

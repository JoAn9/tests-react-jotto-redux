import React from 'react';
import { shallow } from 'enzyme';
import Input, { _Input } from './Input';
import { storeFactory } from '../test/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  // console.log(wrapper.debug());
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = wrapper.find('[data-test="component-input"]');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = wrapper.find('[data-test="input-box"]');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = wrapper.find('[data-test="submit-button"]');
      expect(submitButton.length).toBe(1);
    });
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });
    test('renders component without error', () => {
      const component = wrapper.find('[data-test="component-input"]');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = wrapper.find('[data-test="input-box"]');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submitButton = wrapper.find('[data-test="input-box"]');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  const createShallow = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store} />).dive();
    return wrapper;
  };

  test('success piece of state from redux store is passed correctly', () => {
    const success = true;
    const wrapper = createShallow({ success });
    expect(wrapper.props().success).toBe(success);
  });

  test('action creator `guessWord` is a function', () => {
    const wrapper = createShallow();
    const guessWordProp = wrapper.props().guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('guessWord action creator', () => {
  const guessedWord = 'beer';
  const mockGuessWord = jest.fn();
  const mockSetGuessedWord = jest.fn();
  let wrapper;
  let submitButton;
  let inputBox;

  beforeEach(() => {
    mockGuessWord.mockClear();
    wrapper = shallow(<_Input guessWord={mockGuessWord} />);
    React.useState = jest.fn(() => [guessedWord, mockSetGuessedWord]);
    // React.useState = jest.fn().mockReturnValue([guessedWord, mockSetGuessedWord]);

    inputBox = wrapper.find('[data-test="input-box"]');
    const mockEvent = { target: { value: guessedWord } };
    inputBox.simulate('change', mockEvent);

    submitButton = wrapper.find('[data-test="submit-button"]');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('guessWord action is called once on clicking submit button', () => {
    expect(mockGuessWord.mock.calls.length).toBe(1);
  });
  test('guessWord action is called with proper argument', () => {
    expect(mockGuessWord.mock.calls.length).toBe(1);
    expect(mockGuessWord.mock.calls[0][0]).toBe(guessedWord);
    // expect(mockGuessWord).toHaveBeenCalledWith(guessedWord);
  });
  test('input-box is cleared after submitting', () => {
    expect(inputBox.text()).toBe('');
  });
});

describe('Give Up button tests', () => {
  test('button renders without error when success is false', () => {
    const wrapper = setup({ success: false });
    const component = wrapper.find('[data-test="component-give-up"]');
    expect(component.length).toBe(1);
    expect(component.text()).toBe('Give Up');
  });
  test('button does not render when success is true', () => {
    const wrapper = setup({ success: true });
    const component = wrapper.find('[data-test="component-give-up"]');
    expect(component.length).toBe(0);
  });
  test('clicking on button giving up the game', () => {
    const mockGiveUpAction = jest.fn();
    const wrapper = shallow(
      <_Input success={false} giveUpAction={mockGiveUpAction} />
    );
    const button = wrapper.find('[data-test="component-give-up"]');
    button.simulate('click', { preventDefault() {} });
    expect(mockGiveUpAction.mock.calls.length).toBe(1);
    expect(mockGiveUpAction).toHaveBeenCalledTimes(1);
  });
});

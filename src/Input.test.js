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
  let mockGuessWord;
  let wrapper;

  beforeEach(() => {
    mockGuessWord = jest.fn();
    wrapper = shallow(<_Input guessWord={mockGuessWord} />);
  });

  test('guessWord action is called on clicking submit button', () => {
    wrapper
      .find('[data-test="submit-button"]')
      .simulate('click', { preventDefault() {} });
    // expect(mockGuessWord).toHaveBeenCalled();
    expect(mockGuessWord.mock.calls.length).toBe(1);
  });
  test('guessWord action is called with proper argument', () => {
    const guessedWord = 'beer';
    React.useState = jest.fn(() => [guessedWord, jest.fn()]);

    const inputBox = wrapper.find('[data-test="input-box"]');
    const mockEvent = { target: { value: guessedWord } };
    inputBox.simulate('change', mockEvent);
    const submitButton = wrapper.find('[data-test="submit-button"]');
    submitButton.simulate('click', { preventDefault() {} });
    expect(mockGuessWord.mock.calls.length).toBe(1);
    expect(mockGuessWord.mock.calls[0][0]).toBe(guessedWord);
    // expect(mockGuessWord).toHaveBeenCalledWith(guessedWord);
  });
});

import { createStore } from 'redux';
import rootReducer from '../src/reducers';

export const storeFactory = initialState =>
  createStore(rootReducer, initialState);

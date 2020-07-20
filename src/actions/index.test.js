import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  test('set secret word', async () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    await store.dispatch(getSecretWord());
    const newState = store.getState();
    expect(newState.secretWord).toBe(secretWord);
  });
});

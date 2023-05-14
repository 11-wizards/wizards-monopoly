/* eslint no-underscore-dangle: 0 */

import { createDummyStore, type DummyState } from 'app/store';
import { AppDummy } from 'core/AppDummy';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const initialStateString = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

if (initialStateString) {
  const initialState = JSON.parse(initialStateString) as DummyState;
  ReactDOM.hydrateRoot(
    document.querySelector('#root') as HTMLElement,
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={createDummyStore(initialState)}>
          {/* <App /> */}
          <AppDummy />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}

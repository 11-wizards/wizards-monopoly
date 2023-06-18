/* eslint no-underscore-dangle: 0 */

import { createStore, type RootState } from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { registerServiceWorker } from 'helpers';
import { App } from 'core/App';

const initialStateString = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

if (initialStateString) {
  const initialState = (JSON.parse(initialStateString) as RootState) || {};
  ReactDOM.hydrateRoot(
    document.querySelector('#root') as HTMLElement,
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={createStore(initialState)}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
  registerServiceWorker();
}

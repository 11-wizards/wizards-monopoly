/* eslint no-underscore-dangle: 0 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { App } from 'core/App';
import { AppDummy } from 'core/AppDummy';
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'app/slices/counterSlice';

// сюда ли перенести сторы с клиента? по идее им здесь и место, нет?
const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  preloadedState: window.__PRELOADED_STATE__,
});

delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.querySelector('#root') as HTMLElement,
  <React.StrictMode>
    {/* TODO: заменить AppDummy на App, когда будет готов Redux */}
    {/* <App /> */}
    <Provider store={store}>
      <AppDummy />
    </Provider>
  </React.StrictMode>,
);

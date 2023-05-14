/* eslint no-underscore-dangle: 0 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from 'core/App';
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from 'app/slices/counterSlice';
import { BrowserRouter } from 'react-router-dom';

// сюда ли перенести сторы с клиента? по идее им здесь и место, нет?
const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  preloadedState: window.__PRELOADED_STATE__,
});

delete window.__PRELOADED_STATE__;

// надо ли тут оборачивать в browserRouter? Кажется нет, но на всякий случай обернул

if (typeof window !== 'undefined') {
  ReactDOM.hydrateRoot(
    document.querySelector('#root') as HTMLElement,
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}

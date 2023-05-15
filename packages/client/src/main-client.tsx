import { createStore } from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'core/App';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
);

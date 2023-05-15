import { createStore } from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'core/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

import type { RootState } from 'app/store';
import { createStore } from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'core/App';
import { Provider } from 'react-redux';
// import { registerServiceWorker } from 'helpers';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStore({} as RootState)}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// registerServiceWorker();

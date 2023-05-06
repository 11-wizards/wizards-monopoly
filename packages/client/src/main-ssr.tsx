import React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from 'core/App';
import { AppDummy } from 'core/AppDummy';

ReactDOM.hydrateRoot(
  document.querySelector('#root') as HTMLElement,
  <React.StrictMode>
    {/* TODO: заменить AppDummy на App, когда будет готов Redux */}
    {/* <App /> */}
    <AppDummy />
  </React.StrictMode>,
);

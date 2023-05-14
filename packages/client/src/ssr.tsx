import { createStore } from 'app/store';
import { App } from 'core/App';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

export function render(url: string) {
  const store = createStore();
  const initialState = store.getState();
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  );

  return [initialState, appHtml];
}

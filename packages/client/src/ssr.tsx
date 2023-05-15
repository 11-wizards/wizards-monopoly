import { createStore, type RootState } from 'app/store';
import { App } from 'core/App';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

export async function render(url: string): Promise<[RootState, string]> {
  const store = createStore();
  const initialState = store.getState();
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  );

  return Promise.resolve([initialState, appHtml]);
}

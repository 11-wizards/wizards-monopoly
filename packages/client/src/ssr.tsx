import { incrementServer } from 'app/slices/counterSlice';
import { createDummyStore } from 'app/store';
import { AppDummy } from 'core/AppDummy';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

export function render(url: string) {
  const store = createDummyStore();
  store.dispatch(incrementServer());
  const initialState = store.getState();
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        {/* <App /> */}
        <AppDummy />
      </Provider>
    </StaticRouter>,
  );

  return [initialState, appHtml];
}

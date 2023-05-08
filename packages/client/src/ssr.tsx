import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
// import { App } from 'core/App';
import { AppDummy } from 'core/AppDummy';
import { serverStore } from 'app/serverStore';

export function render(): string {
  return renderToString(
    <Provider store={serverStore()}>
      <AppDummy />
    </Provider>,
  );
}

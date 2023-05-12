import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { App } from 'core/App';
import { serverStore } from 'app/serverStore';
import { StaticRouter } from 'react-router-dom/server';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={serverStore()}>
        <App />
      </Provider>
    </StaticRouter>,
  );
}

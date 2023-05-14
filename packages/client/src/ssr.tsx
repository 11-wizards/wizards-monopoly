import { renderToString } from 'react-dom/server';
// import { App } from 'core/App';
import { AppDummy } from 'core/AppDummy';

export function render(): string {
  return renderToString(<AppDummy />);
}

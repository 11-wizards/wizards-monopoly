import { type Plugin } from 'vite';

export function nonceInjectPlugin(): Plugin {
  return {
    name: 'nonce-inject-plugin',
    enforce: 'post',
    transformIndexHtml(html: string) {
      const regex = /<script(.*?)/gi;
      const replacement = '<script nonce="<!--nonce-outlet-->"';

      return html.replace(regex, replacement);
    },
  };
}

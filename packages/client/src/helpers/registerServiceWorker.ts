/* eslint @typescript-eslint/no-floating-promises: 0 */
export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
};

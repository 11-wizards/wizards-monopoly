declare const __SERVER_PORT__: number;

declare global {
  interface Window {
    __PRELOADED_STATE__?: string;
  }
}

export {};

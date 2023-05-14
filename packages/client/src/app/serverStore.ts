/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';

export const serverStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      counter: counterSlice,
    },
    preloadedState: preloadedState,
  });
};

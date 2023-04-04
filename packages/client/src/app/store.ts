import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    // locale
    user: userReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import gameSettingsReducer from './slices/gameSettingsSlice';

export const store = configureStore({
  reducer: {
    // locale
    user: userReducer,
    gameSettings: gameSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

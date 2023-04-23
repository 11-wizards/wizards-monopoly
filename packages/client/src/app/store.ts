import { configureStore } from '@reduxjs/toolkit';
import forumReducer from './slices/forumSlice';
import gameReducer from './slices/gameSlice';
import localeReducer from './slices/localeSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    forum: forumReducer,
    game: gameReducer,
    locale: localeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

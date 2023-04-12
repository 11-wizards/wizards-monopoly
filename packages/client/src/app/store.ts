import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import forumReducer from './slices/forumSlice';

export const store = configureStore({
  reducer: {
    // locale
    user: userReducer,
    forum: forumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

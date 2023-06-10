import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'api/base.api';
import { oAuthApi } from 'api/oauth.api';
import forumReducer from './slices/forumSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import gameReducer from './slices/gameSlice';
import localeReducer from './slices/localeSlice';
import userReducer from './slices/userSlice';

const reducer = {
  forum: forumReducer,
  leaderboard: leaderboardReducer,
  game: gameReducer,
  locale: localeReducer,
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function createStore(initialState?: RootState) {
  return configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware, oAuthApi.middleware),
  });
}

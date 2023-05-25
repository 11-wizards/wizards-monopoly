import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from './slices/leaderboardSlice';
import gameReducer from './slices/gameSlice';
import localeReducer from './slices/localeSlice';
import userReducer from './slices/userSlice';

const reducer = {
  leaderboard: leaderboardReducer,
  game: gameReducer,
  locale: localeReducer,
  user: userReducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function createStore(initialState?: RootState) {
  return configureStore({ reducer, preloadedState: initialState });
}

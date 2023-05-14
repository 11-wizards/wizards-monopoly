import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'app/slices/counterSlice';
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
};

const dummyReducer = {
  counter: counterReducer,
};

const store = configureStore({ reducer });
const dummyStore = configureStore({ reducer: dummyReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DummyState = ReturnType<typeof dummyStore.getState>;

export function createStore(initialState?: RootState) {
  return configureStore({ reducer, preloadedState: initialState });
}

export function createDummyStore(initialState?: DummyState) {
  return configureStore({ reducer: dummyReducer, preloadedState: initialState });
}

import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type GameSettingsState = {
  isGameRulesShown: boolean;
};

const initialState: GameSettingsState = {
  isGameRulesShown: false,
};

const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    showGameRules: (state: GameSettingsState) => {
      state.isGameRulesShown = !state.isGameRulesShown;
    },
  },
});

export const selectIsGameRulesShown = createSelector(
  (state: RootState) => state.gameSettings.isGameRulesShown,
  (isGameRulesShown) => isGameRulesShown,
);

export const { showGameRules } = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;

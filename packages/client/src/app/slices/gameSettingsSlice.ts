import type { PayloadAction } from '@reduxjs/toolkit';
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
    showGameRules: (state: GameSettingsState, action: PayloadAction<boolean>) => {
      state.isGameRulesShown = action.payload;
    },
  },
});

export const selectIsGameRulesShown = createSelector(
  (state: RootState) => state.gameSettings.isGameRulesShown,
  (isGameRulesShown) => isGameRulesShown,
);

export const { showGameRules } = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type GameState = {
  numberOfPlayers: number;
};

const initialState: GameState = {
  numberOfPlayers: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNumberOfPlayers: (state, action: PayloadAction<number>) => {
      state.numberOfPlayers = action.payload;
    },
  },
});

export const { setNumberOfPlayers } = gameSlice.actions;

export default gameSlice.reducer;

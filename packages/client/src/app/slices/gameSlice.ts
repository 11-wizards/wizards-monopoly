import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type GameState = {
  numberOfPlayers: number;
  playerNames: Record<string, string>;
};

const initialState: GameState = {
  numberOfPlayers: 0,
  playerNames: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setNumberOfPlayers: (state, action: PayloadAction<number>) => {
      state.numberOfPlayers = action.payload;
    },

    setPlayerName: (state, action: PayloadAction<Record<string, string>>) => {
      state.playerNames = action.payload;
    },
  },
});

export const { setNumberOfPlayers, setPlayerName } = gameSlice.actions;

export default gameSlice.reducer;

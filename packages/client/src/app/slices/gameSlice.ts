import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { GameSetupFormData } from 'features/GameSetup/types';
import type { Player } from 'types/game';
import { convertFormPlayersToPlayersObject } from 'app/slices/utils';
import type { RootState } from 'app/store';

type GameState = {
  numberOfPlayers: number;
  players: Player[];
};

const initialState: GameState = {
  numberOfPlayers: 0,
  players: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    definePlayers: {
      reducer: (state, action: PayloadAction<Player[]>) => {
        state.players = action.payload;
      },
      prepare: (formPlayers: GameSetupFormData) => {
        const players = convertFormPlayersToPlayersObject(formPlayers);

        return { payload: players };
      },
    },
  },
});

export const selectPlayers = (rootState: RootState) => rootState.game.players;

export const { definePlayers } = gameSlice.actions;

export default gameSlice.reducer;

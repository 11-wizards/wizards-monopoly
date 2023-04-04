import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { GameSetupFormData } from 'features/GameSetup/types';
import type { PlayerColors } from 'types/enums/main';

type GameState = {
  numberOfPlayers: number;
  players: Players;
};

type Player = {
  color: PlayerColors;
  name: string;
};

type Players = Record<string, Player>;

const initialState: GameState = {
  numberOfPlayers: 0,
  players: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    definePlayers: {
      reducer: (state, action: PayloadAction<Players>) => {
        state.players = action.payload;
      },
      prepare: (players: GameSetupFormData) => ({
        payload: Object.keys(players).reduce((result: Players, key): Players => {
          const [keyName, playerNum] = key.split('_').slice(1);
          const playerKey = `player_${playerNum}`;
          const player = result[playerKey] || {};

          return {
            ...result,
            [playerKey]: {
              ...player,
              [keyName]: players[key],
            },
          };
        }, {}),
      }),
    },
  },
});

export const { definePlayers } = gameSlice.actions;

export default gameSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { GameSetupFormData } from '../../features/GameSetup/types';

type GameState = {
  numberOfPlayers: number;
  players: Players;
};

type Player = {
  name: string;
  color: string;
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
    setNumberOfPlayers: (state, action: PayloadAction<number>) => {
      state.numberOfPlayers = action.payload;
    },
    setPlayers: {
      reducer: (state, action: PayloadAction<Players>) => {
        state.players = action.payload;
      },
      prepare: (players: GameSetupFormData) => ({
        payload: Object.keys(players).reduce((result: Players, key): Players => {
          const [keyName, playerNum] = key.split('_').slice(1);

          const player = result[`player_${playerNum}`] || {};

          return {
            ...result,
            [`player_${playerNum}`]: {
              ...player,
              [keyName]: players[key],
            },
          };
        }, {}),
      }),
    },
  },
});

export const { setNumberOfPlayers, setPlayers } = gameSlice.actions;

export default gameSlice.reducer;

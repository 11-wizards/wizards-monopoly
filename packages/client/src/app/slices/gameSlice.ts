import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PlayerColor } from 'types/enums/main';
import { PlayerDirection } from 'types/enums/main';
import { Player } from 'game/model';
import type { GameSetupFormData } from 'features/GameSetup/types';
import type { PlayerPosition } from 'models/game.model';
import type { RootState } from '../store';

type GameState = {
  numberOfPlayers: number;
  players: Player[];
  playersPositions: PlayerPosition[];
};

const initialState: GameState = {
  numberOfPlayers: 0,
  players: [],
  playersPositions: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    definePlayers: {
      reducer: (
        state,
        action: PayloadAction<{ players: Player[]; playersPositions: PlayerPosition[] }>,
      ) => {
        const { players, playersPositions } = action.payload;
        state.players = players;
        state.playersPositions = playersPositions;
      },
      prepare: (formPlayers: GameSetupFormData) => {
        const keys = Object.keys(formPlayers);
        const playersCount = keys.length / 2;
        const playersObject: Record<number, { name: string; color: PlayerColor }> = {};

        keys.forEach((key) => {
          const splitKey = key.split('_');
          const keyNum = Number(splitKey[splitKey.length - 1]);
          const propertyName = splitKey[splitKey.length - 2];
          const value = formPlayers[key];
          if (propertyName === 'name' || propertyName === 'color') {
            playersObject[keyNum] = { ...playersObject[keyNum], [propertyName]: value };
          }
        });

        const players: Player[] = [];
        const playersPositions: PlayerPosition[] = [];

        for (let i = 1; i <= playersCount; i++) {
          const { name, color } = playersObject[i];
          const y = (i - 1) * 20;
          const id = nanoid();
          const position: PlayerPosition = { id, x: 0, y, direction: PlayerDirection.RIGHT };
          players.push(new Player(id, name, color));
          playersPositions.push(position);
        }

        return { payload: { players, playersPositions } };
      },
    },
  },
});

export const selectPlayers = (rootState: RootState) => rootState.game.players;

export const { definePlayers } = gameSlice.actions;

export default gameSlice.reducer;

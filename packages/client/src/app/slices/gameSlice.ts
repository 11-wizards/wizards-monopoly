import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { GameSetupFormData } from 'features/GameSetup/types';
import type { Players, MoneyTransfer, BankTransaction } from 'types/game';

type GameState = {
  players: Players;
};

const initialState: GameState = {
  players: {},
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    definePlayers: {
      prepare: (players: GameSetupFormData) => ({
        payload: Object.keys(players).reduce((result: Players, key): Players => {
          const [keyName, playerNum] = key.split('_').slice(1);
          const playerKey = `player_${playerNum}`;
          const player = result[playerKey] || {};

          return {
            ...result,
            [playerKey]: {
              ...player,
              id: nanoid(4),
              [keyName]: players[key],
            },
          };
        }, {}),
      }),
      reducer: (state, action: PayloadAction<Players>) => {
        state.players = action.payload;
      },
    },

    // TODO: Добавить логику
    // buyProperty: (state, action: PayloadAction<PropertyId>) => {},

    // TODO: Добавить логику
    // sellProperty: (state, action: PayloadAction<PropertyId>) => {},

    addMoneyForPlayer: (state, action: PayloadAction<BankTransaction>) => {
      const { amount, playerId } = action.payload;

      state.players[playerId].balance += amount;
    },

    deductMoneyFromPlayer: (state, action: PayloadAction<BankTransaction>) => {
      const { amount, playerId } = action.payload;

      state.players[playerId].balance -= amount;
    },

    transferMoneyBetweenPlayers: (state, action: PayloadAction<MoneyTransfer>) => {
      const { senderId, recipientId, amount } = action.payload;

      state.players[senderId].balance -= amount;
      state.players[recipientId].balance += amount;
    },
  },
});

export const {
  definePlayers,
  transferMoneyBetweenPlayers,
  addMoneyForPlayer,
  deductMoneyFromPlayer,
} = gameSlice.actions;

export default gameSlice.reducer;

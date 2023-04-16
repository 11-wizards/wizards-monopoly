import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { convertFormPlayersToPlayersObject } from 'app/slices/utils';
import type { GameSetupFormData } from 'features/GameSetup/types';
import type {
  BankTransaction,
  BuyPropertyCardPayload,
  MoneyTransfer,
  Player,
  Players,
  PropertyCardId,
  PropertyCards,
} from 'types/game';

type GameState = {
  players: Players;
  propertyCards: PropertyCards;
};

const initialState: GameState = {
  players: [],
  propertyCards: {},
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

    purchasePropertyCard: (state, action: PayloadAction<BuyPropertyCardPayload>) => {
      const { propertyCardId, playerId } = action.payload;

      state.propertyCards[propertyCardId].ownerId = playerId;
    },

    withdrawPropertyCard: (state, action: PayloadAction<PropertyCardId>) => {
      const { payload } = action;

      state.propertyCards[payload].ownerId = null;
    },

    addMoneyForPlayer: (state, action: PayloadAction<BankTransaction>) => {
      const { amount, playerId } = action.payload;

      state.players.find((player) => player.id === playerId)!.balance += amount;
    },
    deductMoneyFromPlayer: (state, action: PayloadAction<BankTransaction>) => {
      const { amount, playerId } = action.payload;

      state.players.find((player) => player.id === playerId)!.balance += amount;
    },

    transferMoneyBetweenPlayers: (state, action: PayloadAction<MoneyTransfer>) => {
      const { senderId, recipientId, amount } = action.payload;

      state.players.find((player) => player.id === senderId)!.balance += amount;
      state.players.find((player) => player.id === recipientId)!.balance -= amount;
    },
  },
});

export const {
  definePlayers,
  transferMoneyBetweenPlayers,
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  purchasePropertyCard,
  withdrawPropertyCard,
} = gameSlice.actions;

export default gameSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { convertFormPlayersToPlayersObject } from 'app/slices/utils';
import type { RootState } from 'app/store';
import { randomCards } from 'data/cards';
import type { GameSetupFormData } from 'features/GameSetup/types';
import { players } from 'game/common';
import { useEffect } from 'react';
import type { CardData, RandomCard } from 'types/cards';
import { PlayerColor } from 'types/enums/main';
import type {
  BankTransaction,
  BuyPropertyCardPayload,
  MoneyTransfer,
  Player,
  Players,
  PropertyCardId,
  PropertyCards,
  changePositionPlayerPayload,
} from 'types/game';

type GameState = {
  cardsData: Record<number, CardData> | null;
  players: Players;
  randomCards: RandomCard[];
  propertyCards: PropertyCards;
};

const initialState: GameState = {
  players: [...players],
  cardsData: null,
  randomCards: randomCards,
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
    defineCards: (state, action: PayloadAction<Record<number, CardData>>) => {
      const cardsData = action.payload;
      state.cardsData = cardsData;
    },

    changeCardData: (state, action) => {
      const { card, title } = action.payload;
      if (!state.cardsData) return;
      const renameCard = { ...state.cardsData[card], title: 'КУПЛЕНО!' };
      state.cardsData = { ...state.cardsData, [card]: renameCard };
    },
    changePositionPlayer: (state, action: PayloadAction<changePositionPlayerPayload>) => {
      const { id, currentCardId } = action.payload;
      const newState = [...state.players];
      newState[id] = { ...newState[id], currentCardId };
      state.players = newState;
    },

    leavePlayer: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const newState = [...state.players];
      newState[id] = { ...newState[id], leave: true };
      state.players = newState;
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

      state.players.find((player) => player.id === playerId)!.balance -= amount;
      console.log(state);
    },

    transferMoneyBetweenPlayers: (state, action: PayloadAction<MoneyTransfer>) => {
      const { senderId, recipientId, amount } = action.payload;

      state.players.find((player) => player.id === senderId)!.balance += amount;
      state.players.find((player) => player.id === recipientId)!.balance -= amount;
    },
  },
});

export const selectPlayers = (rootState: RootState) => rootState.game.players;
export const selectCardsData = (rootState: RootState) => rootState.game.cardsData;
export const selectRandomCards = (rootState: RootState) => rootState.game.randomCards;

export const {
  definePlayers,
  defineCards,
  changeCardData,
  changePositionPlayer,
  leavePlayer,
  transferMoneyBetweenPlayers,
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  purchasePropertyCard,
  withdrawPropertyCard,
} = gameSlice.actions;

export default gameSlice.reducer;

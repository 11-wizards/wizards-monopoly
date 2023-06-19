import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { convertFormPlayersToPlayersObject } from 'app/slices/utils';
import type { RootState } from 'app/store';
import { cardsData, randomCards } from 'game/data/cards';
import type { GameSetupFormData } from 'features/GameSetup/types';
import {
  CardLevel,
  type CardData,
  type RandomCard,
  STREET,
  INFRASTRUCTURE,
} from 'game/types/cards';
import type {
  BankTransaction,
  BuyPropertyCardPayload,
  MoneyTransfer,
  Player,
  changePositionPlayerPayload,
} from 'game/types/game';

export type GameState = {
  cardsData: Array<CardData>;
  currentPlayer: Nullable<number>;
  players: Array<Player>;
  randomCards: RandomCard[];
};

const initialState: GameState = {
  currentPlayer: null,
  players: [],
  cardsData,
  randomCards,
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
    // defineCards: (state, action: PayloadAction<Record<number, CardData>>) => {
    //   const cardsData = action.payload;
    //   state.cardsData = cardsData;
    // },

    changeCurrentPlayer: (state, action: PayloadAction<number>) => {
      const playerId = action.payload;
      state.currentPlayer = playerId;
    },

    loadSavesGame: {
      reducer: (state, action: PayloadAction<GameState>) => {
        const loadState = action.payload;
        // Object.keys(state).map((key: keyof GameState) => {
        //   state[key] = loadState[key];
        // });
        state.currentPlayer = loadState.currentPlayer;
        state.cardsData = loadState.cardsData;
        state.players = loadState.players;
        state.randomCards = loadState.randomCards;
      },
      prepare: (loadState: GameState) => ({ payload: loadState }),
    },

    // changeCardData: (state, action) => {
    //   const { card, title } = action.payload;
    //   if (!state.cardsData) return;
    //   const renameCard = { ...state.cardsData[card], title: 'КУПЛЕНО!' };
    //   state.cardsData = { ...state.cardsData, [card]: renameCard };
    // },

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
    // ДЕНЬГИ ИГРОКА

    addMoneyForPlayer: (state, action: PayloadAction<BankTransaction>) => {
      const { amount, playerId } = action.payload;

      state.players.find((player) => player.id === playerId)!.balance += amount;
    },

    transferMoneyBetweenPlayers: (state, action: PayloadAction<MoneyTransfer>) => {
      const { senderId, recipientId, amount } = action.payload;
      state.players.find((player) => player.id === senderId)!.balance += amount;
      state.players.find((player) => player.id === recipientId)!.balance -= amount;
    },

    deductMoneyFromPlayer: (state, action: PayloadAction<BankTransaction>) => {
      const { amount, playerId } = action.payload;
      state.players.find((player) => player.id === playerId)!.balance -= amount;
    },

    // СОБСТВЕННОСТЬ

    transferPropertyCard: (state, action: PayloadAction<BuyPropertyCardPayload>) => {
      const { cardId, playerId } = action.payload;
      if (
        state.cardsData &&
        (state.cardsData[cardId].type === STREET || state.cardsData[cardId].type === INFRASTRUCTURE)
      ) {
        const property = {
          ownerId: playerId,
          color: state.players.find((player) => player.id === playerId)!.color,
          level: CardLevel.LEVEL_0,
        };
        if (state.cardsData && state.cardsData[cardId].property) {
          const level = state.cardsData[cardId].property?.level;
          if (level) property.level = level;
        }
        state.cardsData[cardId].property = property;
      }
    },

    withdrawPropertyCard: (state, action: PayloadAction<number>) => {
      const { payload: cardId } = action;

      if (state.cardsData && state.cardsData[cardId].property !== undefined) {
        state.cardsData[cardId].property = null;
      }
    },

    deprivePropertyPlayer: (state, action: PayloadAction<number>) => {
      const { payload: playerId } = action;
      const playerProperty: Array<number> = [];
      if (state.cardsData) {
        Object.entries(state.cardsData).map(([key, { property }]) =>
          property?.ownerId === playerId ? playerProperty.push(Number(key)) : '',
        );
        playerProperty.forEach((item) => {
          if (state.cardsData) state.cardsData[item].property = null;
        });
      }
    },
    upgradeLevelCard: (state, action: PayloadAction<number>) => {
      const { payload: cardId } = action;
      if (state.cardsData && state.cardsData[cardId]) {
        const { type, property } = state.cardsData[cardId];
        const level = property?.level ?? CardLevel.LEVEL_0;
        if (type === STREET && level < CardLevel.LEVEL_5 && property) {
          state.cardsData[cardId].property = { ...property, level: level + 1 };
        }
      }
    },
    downgradeLevelCard: (state, action: PayloadAction<number>) => {
      const { payload: cardId } = action;
      if (state.cardsData && state.cardsData[cardId]) {
        const { type, property } = state.cardsData[cardId];
        const level = property?.level ?? CardLevel.LEVEL_0;
        if (type === STREET && level > CardLevel.LEVEL_0 && property) {
          state.cardsData[cardId].property = { ...property, level: level - 1 };
        }
      }
    },
  },
});

export const selectRoot = (rootState: RootState) => rootState.game;
export const selectPlayers = (rootState: RootState) => rootState.game.players;
export const selectCurrentPlayer = (rootState: RootState) => rootState.game.currentPlayer;
export const selectCardsData = (rootState: RootState) => rootState.game.cardsData;
export const selectRandomCards = (rootState: RootState) => rootState.game.randomCards;

export const {
  definePlayers,
  // defineCards,
  // changeCardData,
  changePositionPlayer,
  leavePlayer,
  transferMoneyBetweenPlayers,
  loadSavesGame,
  addMoneyForPlayer,
  deductMoneyFromPlayer,
  transferPropertyCard,
  deprivePropertyPlayer,
  withdrawPropertyCard,
  changeCurrentPlayer,
  upgradeLevelCard,
  downgradeLevelCard,
} = gameSlice.actions;

export default gameSlice.reducer;

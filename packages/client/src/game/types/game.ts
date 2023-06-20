import type { MapDirectons } from 'game/types/map';
import type { PlayerColor } from 'types/enums/main';
import type { PropertyCard } from './cards';

export type MapData = Record<string, number>;

export enum StepsMove {
  INITIAL,
  DIECES,
  MOVE,
  ACTION,
  RENDER,
}

export const { INITIAL, DIECES, MOVE, ACTION, RENDER } = StepsMove;

export type Player = {
  balance: number;
  color: PlayerColor;
  currentCardId: number;
  id: number;
  leave: boolean;
  name: string;
};

export type GamePlayerResult = {
  gameTime: string | null;
  key: number;
  name: string;
  place: number | null;
  profit: number;
  property: number;
};

// OLD TYPES

export type PlayerPosition = { direction: MapDirectons; x: number; y: number };

export type PlayerPositionTarget = number[];

export type MoneyTransfer = {
  amount: number;
  recipientId: number;
  senderId: number;
};

export type BankTransaction = {
  amount: number;
  playerId: number;
};

export type changePositionPlayerPayload = {
  currentCardId: number;
  id: number;
};

export type BuyPropertyCardPayload = {
  cardId: number;
  playerId: number;
};

export type PropertyCards = Record<string, PropertyCard>;

export type PropertyCardId = keyof PropertyCards;

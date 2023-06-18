import { MapDirectons } from 'game/types/map';
import { PropertyCard } from './cards';
import { Player } from './player';

export type MapData = Record<string, number>;



export enum StepsMove {
  INITIAL,
  DIECES,
  MOVE,
  ACTION,
  RENDER,
}

export const { INITIAL, DIECES, MOVE, ACTION, RENDER } = StepsMove;







//OLD TYPES

export type PlayerPosition = { direction: MapDirectons; x: number; y: number };

export type PlayerPositionTarget = number[];



export type Players = Player[];

export type PlayerId = Player['id'];




export type MoneyTransfer = {
  amount: number;
  recipientId: PlayerId;
  senderId: PlayerId;
};

export type BankTransaction = {
  amount: number;
  playerId: PlayerId;
};

export type changePositionPlayerPayload = {
  currentCardId: number;
  id: PlayerId;
};

export type BuyPropertyCardPayload = {
  playerId: PlayerId;
  cardId: number;
};


export type PropertyCards = Record<string, PropertyCard>;

export type PropertyCardId = keyof PropertyCards;

// export type Card = {
//   h: number;
//   w: number;
//   x: number;
//   y: number;
// };

// export type CardImg = {
//   imgElem: CanvasImageSource | null;
//   imgH: number;
//   imgSrc: string;
//   imgW: number;
//   imgX: number;
//   imgY: number;
// };

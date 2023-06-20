import type { PlayerColor } from 'types/enums/main';
import type { CardFamily, CardLevel, CardTypes } from './cards';

export enum MapDirectons {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  UNKNOWN,
}

export enum CornersCardsID {
  CARD_TOP_LEFT = 0,
  CARD_TOP_RIGHT = 10,
  CARD_BOTTOM_LEFT = 20,
  CARD_BOTTOM_RIGHT = 30,
}

export type TypeMapData = {
  cards: Array<TypeMapCardsData>;
  mapSize: number;
  playerSize: number;
  players: Array<TypePlayerData>;
};
export type TypePlayerData = {
  balance: number;
  readonly color: PlayerColor;
  currentCardId: number;
  readonly id: number;
  leave: boolean;
  readonly name: string;
};

export type TypeMapCardsData = {
  colorBg: Nullable<PlayerColor>;
  colorLabel: Nullable<CardFamily>;
  h: number;
  img: Nullable<CanvasImageSource>;
  level: Nullable<CardLevel>;
  price: Nullable<number>;
  title: Nullable<string>;
  type: CardTypes;
  w: number;
  x: number;
  y: number;
};

//

export type PlayersPositions = Array<{
  color: string;
  direction: MapDirectons;
  id: number;
  x: number;
  y: number;
}>;

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
  colorBg: PlayerColor | null;
  colorLabel: CardFamily | null;
  h: number;
  img: CanvasImageSource | null;
  level: CardLevel | null;
  price: number | null;
  title: string | null;
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

export type TypeStaticDataMap = {
  cards: Array<{
    colorLabel: string | null;
    id: number;
    img: string | null;
    label: string | null;
    position: [number, number, number, number];
    price: number | null;
  }>;
  map: { size: number };
  players: { size: number };
};

export type TypeDynamicDataMap = {
  cards: Array<{
    colorLevel: string | null;
    id: number;
    level: number | null;
  }>;
  players: Array<{
    cardId: number;
    id: number;
  }>;
};

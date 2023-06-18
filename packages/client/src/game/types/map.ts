import { PlayerColor } from "types/enums/main";
import { CardFamily, CardLevel, CardTypes } from "./cards";
import { CardType } from "antd/es/card/Card";

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
  mapSize: number;
  playerSize: number;
  cards: Array<TypeMapCardsData>;
  players: Array<TypePlayerData>;
}
export type TypePlayerData = {
  readonly id: number;
  readonly name: string;
  readonly color: PlayerColor;
  balance: number;
  currentCardId: number;
  leave: boolean;
};

export type TypeMapCardsData = {
  h: number;
  w: number;
  x: number;
  y: number;
  img: CanvasImageSource | null;
  price: number | null;
  colorLabel: CardFamily | null;
  title: string | null;
  level: CardLevel | null;
  colorBg: PlayerColor | null;
  type: CardTypes;
}

//


export type PlayersPositions = Array<{
  color: string;
  direction: MapDirectons;
  id: number;
  x: number;
  y: number;
}>;


export type TypeStaticDataMap = {
  map: { size: number };
  cards: Array<{
    id: number;
    position: [number, number, number, number];
    img: string | null;
    label: string | null;
    colorLabel: string | null;
    price: number | null;
  }>;
  players: { size: number };
}




export type TypeDynamicDataMap = {
  cards: Array<{
    id: number;
    level: number | null;
    colorLevel: string | null;
  }>
  players: Array<{
    id: number;
    cardId: number;
  }>
}



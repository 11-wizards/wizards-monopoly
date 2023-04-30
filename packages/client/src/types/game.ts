import type { MapDirectons, PlayerColor } from './enums/main';

export type MapData = Record<string, number>;

export type NewTargetPlayer = Nullable<{
  dicesNumber: number[];
  id: number;
  target: number;
}>;

export type PlayerTarget = Nullable<{
  id: number;
  target: number;
}>;

export type PlayersPositions = Array<{
  color: string;
  direction: MapDirectons;
  id: number;
  x: number;
  y: number;
}>;

export type PlayerPosition = { direction: MapDirectons; x: number; y: number };

export type PlayerPositionTarget = number[];

export type Player = {
  balance: number;
  readonly color: PlayerColor;
  currentCardId: string;
  readonly id: number;
  readonly name: string;
};

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

export type BuyPropertyCardPayload = {
  playerId: PlayerId;
  propertyCardId: PropertyCardId;
};

export type PropertyCard = {
  // FIXME: Изменить тип на цвета доски
  color: string;
  name: string;
  ownerId: Nullable<number>;
  price: number;
  rent: number;
};

export type PropertyCards = Record<string, PropertyCard>;

export type PropertyCardId = keyof PropertyCards;

export type Card = {
  h: number;
  w: number;
  x: number;
  y: number;
};

// export type CardImg = {
//   imgElem: CanvasImageSource | null;
//   imgH: number;
//   imgSrc: string;
//   imgW: number;
//   imgX: number;
//   imgY: number;
// };

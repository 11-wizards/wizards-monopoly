import type { PlayerColors } from 'types/enums/main';

export type Player = {
  balance: number;
  color: PlayerColors;
  id: string;
  name: string;
  properties: Property[];
};

export type Players = Record<string, Player>;

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

export type Property = {
  // TODO: Изменить тип на цвета доски
  color: string;
  id: string;
  name: string;
  ownerId?: PlayerId;
  price: number;
};

export type PropertyId = Property['id'];

export type Properties = Property[];

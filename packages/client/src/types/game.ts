export type Player = {
  balance: number;
  readonly color: string;
  currentCardId: string;
  readonly id: string;
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
  ownerId: Nullable<string>;
  price: number;
  rent: number;
};

export type PropertyCards = Record<string, PropertyCard>;

export type PropertyCardId = keyof PropertyCards;

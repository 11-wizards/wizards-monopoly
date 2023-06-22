import type { PlayerColor } from 'types/enums/main';

export enum CardTypes {
  ZERO,
  STREET,
  PRISON,
  ARREST,
  INFRASTRUCTURE,
  TAX,
  RANDOM,
}

export enum CardFamily {
  NONE,
  RAILWAY,
  RESOURCES,
  STREET_1 = '#933f3f',
  STREET_2 = '#91caff',
  STREET_3 = '#cc00ff',
  STREET_4 = '#fb7400',
  STREET_5 = '#c50c0c',
  STREET_6 = '#817207',
  STREET_7 = '#22811c',
  STREET_8 = '#1b2d89',
}

export enum CardLevel {
  LEVEL_0,
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5,
}
export const {
  NONE,
  STREET_1,
  STREET_2,
  STREET_3,
  STREET_4,
  STREET_5,
  STREET_6,
  STREET_7,
  STREET_8,
  RAILWAY,
  RESOURCES,
} = CardFamily;

export const { ZERO, STREET, PRISON, ARREST, INFRASTRUCTURE, TAX, RANDOM } = CardTypes;

export type CardData = {
  collateralCost?: number;
  family: CardFamily;
  imgSrc: string;
  price?: number;
  property?: Nullable<PropertyCard>;
  rent?: RentCard;
  title: string;
  type: CardTypes;
  upgradeCost?: {
    home: number;
    hotel: number;
  };
};

export type RentCard = {
  level_0: number;
  level_1: number;
  level_2: number;
  level_3: number;
  level_4: number;
  level_5: number;
};

export type PropertyCard = {
  color: PlayerColor;
  level: CardLevel;
  ownerId: Nullable<number>;
};

export type RandomCard = {
  credit?: number;
  debt?: number;
  desc: string;
};

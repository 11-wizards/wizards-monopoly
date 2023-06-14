export enum CardTypes {
  ZERO = 0,
  STREET = 'STREET',
  PRISON = 'PRISON',
  ARREST = 'ARREST',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  TAX = 'TAX',
  RANDOM = 'RANDOM',
}

export enum CardFamily {
  NONE = 'NONE',
  STREET_1 = '#933f3f',
  STREET_2 = '#91caff',
  STREET_3 = '#cc00ff',
  STREET_4 = '#fb7400',
  STREET_5 = '#c50c0c',
  STREET_6 = '#ffe000',
  STREET_7 = '#22811c',
  STREET_8 = '#1b2d89',
  RAILWAY = 'RAILWAY',
  RESOURCES = 'RESOURCES',
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

export type CardsData = {
  imgSrc: string;
  price?: number;
  priceView: string;
  title: string;
  type: CardTypes;
  family: CardFamily;
};

export type CardData = {
  imgSrc: string;
  price?: number;
  priceView: string;
  title: string;
  type: CardTypes;
  family: CardFamily;
};

export type RandomCard = {
  desc: string;
  credit?: number;
  debt?: number;
};

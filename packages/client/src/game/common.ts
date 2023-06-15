import { START_PLAYER_BALANCE, START_PLAYER_CARD_ID } from 'constants/main';
import { PlayerColor } from 'types/enums/main';

const { BLUE, CYAN, GREEN, PURPLE, RED, YELLOW } = PlayerColor;

export const MAP_DATA = {
  MAP_SIZE: 900,
  PLAYER_SIZE: 18,
  NUMBER_CARDS: 40,
  SIZE_CORNER_CARDS: 13,
  ANIMATION_SPEED: 5,
};

export const MAP_SIZES_PRECENT = {
  MAP_SIZE: 85,
  PLAYER_SIZE: 2,
  NUMBER_CARDS: 40,
  SIZE_CORNER_CARDS: 13,
  ANIMATION_SPEED: 5,
};

export const players = [
  {
    id: 0,
    name: 'Red',
    color: RED,
    balance: 500,
    currentCardId: START_PLAYER_CARD_ID,
    leave: false,
  },
  {
    id: 1,
    name: 'Green',
    color: GREEN,
    balance: START_PLAYER_BALANCE,
    currentCardId: START_PLAYER_CARD_ID,
    leave: false,
  },
  {
    id: 2,
    name: 'Blue',
    color: BLUE,
    balance: 500,
    currentCardId: START_PLAYER_CARD_ID,
    leave: false,
  },
  {
    id: 3,
    name: 'Purple',
    color: PURPLE,
    balance: START_PLAYER_BALANCE,
    currentCardId: START_PLAYER_CARD_ID,
  leave: false

  },
  {
    id: 4,
    name: 'Cyan',
    color: CYAN,
    balance: START_PLAYER_BALANCE,
    currentCardId: START_PLAYER_CARD_ID,
  leave: false

  },
  {
    id: 5,
    name: 'Yellow',
    color: YELLOW,
    balance: START_PLAYER_BALANCE,
    currentCardId: START_PLAYER_CARD_ID,
  leave: false

  },
];

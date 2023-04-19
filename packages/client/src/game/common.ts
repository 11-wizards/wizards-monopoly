import { PlayerColors } from 'types/enums/main';

const { Blue, Cyan, Green, Purple, Red, Yellow } = PlayerColors;

export const MAP_DATA = {
  MAP_SIZE: 900,
  PLAYER_SIZE: 18,
  NUMBER_CARDS: 40,
  SIZE_CORNER_CARDS: 13,
  ANIMATION_SPEED: 5,
};

export const MAP_SIZES_PRECENT = {
  MAP_SIZE: 90,
  PLAYER_SIZE: 2,
  NUMBER_CARDS: 40,
  SIZE_CORNER_CARDS: 13,
  ANIMATION_SPEED: 5,
};

export const players = [
  { id: 0, name: 'Red', color: Red },
  { id: 1, name: 'Green', color: Green },
  { id: 2, name: 'Blue', color: Blue },
  { id: 3, name: 'Purple', color: Purple },
  { id: 4, name: 'Cyan', color: Cyan },
  { id: 5, name: 'Yellow', color: Yellow },
];

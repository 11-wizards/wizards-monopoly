import type { PlayerColor } from './enums/main';

export type Player = {
  readonly id: string;
  readonly name: string;
  readonly color: PlayerColor;
  balance: number;
  currentCardId: string;
};

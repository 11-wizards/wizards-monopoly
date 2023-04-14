import type { PlayerDirection } from 'types/enums/main';

export type PlayerTarget = {
  id: string;
  target: number;
};

export type PlayerPosition = {
  id: string;
  x: number;
  y: number;
  direction?: PlayerDirection;
};

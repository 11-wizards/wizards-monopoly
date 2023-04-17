import type { MapDirectons, PlayerColors } from './enums/main';

export type MapData = Record<string, number>;

export type Players = {
  id: number;
  color: PlayerColors;
  name: string;
}[];

export type NewTargetPlayer = {
  id: number;
  target: number;
  dicesNumber: number[];
} | null;

export type PlayerTarget = {
  id: number;
  target: number;
} | null;

export type PlayersPositions = Array<{
  x: number;
  y: number;
  direction: MapDirectons;
  id: number;
  color: string;
}>;

export type PlayerPosition = { x: number; y: number; direction: MapDirectons };

export type PlayerPositionTarget = Array<number>;

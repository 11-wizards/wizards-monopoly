import type { FC } from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import { Game } from 'game/Game';

import './GamePage.scss';

export type Players = Array<{
  x: number;
  y: number;
  direction?: string;
  id: number;
  color: string;
}>;
export type GoPlayer = Record<string, number>;

const players: Players = [
  { id: 0, color: 'red', x: 0, y: 0, direction: 'right' },
  { id: 1, color: 'green', x: 0, y: 20, direction: 'right' },
  { id: 2, color: 'blue', x: 0, y: 40, direction: 'right' },
  { id: 3, color: 'black', x: 0, y: 60, direction: 'right' },
];

export const GamePage: FC = () => {
  const [goPlayer, setGoPlayer] = useState<GoPlayer | null>(null);
  if (!goPlayer) {
    console.log('анимация закончена');
  }

  const handleGoTestPlayer = (id: number) => {
    const target = Number(prompt('Номер клетки для передвижения от 0 до 39') ?? 0);
    if (target > 39 || target < 0) return;
    setGoPlayer({ id, target });
  };

  return (
    <div className="wrapper_game">
      <Button
        onClick={() => {
          handleGoTestPlayer(0);
        }}
      >
        GO-RED
      </Button>
      <Button
        onClick={() => {
          handleGoTestPlayer(1);
        }}
      >
        GO-GREEN
      </Button>
      <Button
        onClick={() => {
          handleGoTestPlayer(2);
        }}
      >
        GO-BLUE
      </Button>
      <Button onClick={() => handleGoTestPlayer(3)}>GO-BLACK</Button>
      <Game players={players} goPlayer={goPlayer} setGoPlayer={setGoPlayer} />
    </div>
  );
};

import { useState } from 'react';
import { roolDices } from './helpers/helpers';
import { Views } from './Views';

type Players = {
  id: number;
  color: string;
  name: string;
}[];

const players: Players = [
  { id: 0, name: 'Red', color: 'red' },
  { id: 1, name: 'Green', color: 'green' },
  { id: 2, name: 'Blue', color: 'blue' },
  { id: 3, name: 'Black', color: 'black' },
  { id: 4, name: 'yellow', color: 'yellow' },
];

type MapData = Record<string, number>;

const MAP_DATA: MapData = {
  MAP_SIZE: 900,
  NUMBER_CARDS: 40,
  SIZE_CORNER_CARDS: 13,
  SPEED_ANIMATION: 5,
};

export const Game = () => {

  const [currentPlayerStep, setCurrentPlayerStep] = useState<number>(0);
  const [viewsRenderEnd, setViewsRenderEnd] = useState<boolean>(true);
  const [newTargetPlayer, setNewTargetPlayer] = useState<{id: number, target: number, dicesNumber: any } | null>(null);
 
  const [playersCurrentPosition, setPlayersCurrentPosition] = useState<Record<number, number>>(() => {
    const playersCurrentPosition: Record<number, number> = {};
    players.forEach(({ id }) => {
      playersCurrentPosition[id] = 0;
    })
    return playersCurrentPosition;
  });

  const goPlayerNewStep = (dicesNumber: Array<number>) => {
    if (!viewsRenderEnd) return;
    const steps = dicesNumber[0] + dicesNumber[1];
    const id = currentPlayerStep;
    console.log(`Выпало: ${dicesNumber} у игрока ${id}`);
    setCurrentPlayerStep((prevId) => (prevId + 1) % players.length);

    const target = calcNewTarget(id, steps);
    setPlayersCurrentPosition((prevState) => ({
      ...prevState,
      [id]: target,
    }));
    setViewsRenderEnd(false);
    setNewTargetPlayer({ id, target, dicesNumber });
  };

  const handleRoolDice = () => {
    const steps = roolDices();
    goPlayerNewStep(steps);
  };

  const calcNewTarget = (id: number, steps: number) => {
    const oldTarget = playersCurrentPosition[id] ?? 0;
    const target = steps + oldTarget;
    if (target > MAP_DATA.NUMBER_CARDS - 1) {
      return target - MAP_DATA.NUMBER_CARDS;
    }

    return target;
  }

  const currentStepPlayer = players[currentPlayerStep]?.name;

  return (
    <>
      {/* Button убрать в VIEW */}
      <button type="button" onClick={handleRoolDice}>
        <div>Xод игрока: {currentStepPlayer}</div>
      </button>
      <Views
        mapData={MAP_DATA}
        players={players}
        newTargetPlayer={newTargetPlayer}
        renderEnd={() => setViewsRenderEnd(true)}
      />
    </>
  );
};
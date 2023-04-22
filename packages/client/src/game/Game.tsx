import { useState } from 'react';
import type { NewTargetPlayer } from 'types/game';
import { MAP_DATA, players } from './common';
import { rollDices } from './helpers/helpers';
import { Views } from './Views';

export const Game = () => {
  const [currentPlayerStep, setCurrentPlayerStep] = useState<number>(0);

  const [viewsRenderEnd, setViewsRenderEnd] = useState<boolean>(true);

  const [newTargetPlayer, setNewTargetPlayer] = useState<NewTargetPlayer>(null);

  const [playersCurrentPosition, setPlayersCurrentPosition] = useState<Record<number, number>>(
    players.reduce((prev, { id }) => ({ ...prev, [id]: 0 }), {}),
  );

  const calcNewTarget = (id: number, steps: number) => {
    const oldTarget = playersCurrentPosition[id] ?? 0;
    const target = steps + oldTarget;
    if (target > MAP_DATA.NUMBER_CARDS - 1) {
      return target - MAP_DATA.NUMBER_CARDS;
    }

    return target;
  };

  const clickStartPlayerTurn = () => {
    const dicesNumber = rollDices();
    if (!viewsRenderEnd) return;
    setViewsRenderEnd(false);
    const steps = dicesNumber[0] + dicesNumber[1];
    const id = currentPlayerStep;
    console.log(`Выпало:  ${dicesNumber.join(', ')} у игрока ${id}`);
    setCurrentPlayerStep((prevId) => (prevId + 1) % players.length);
    const target = calcNewTarget(id, steps);
    setPlayersCurrentPosition((prevState) => ({
      ...prevState,
      [id]: target,
    }));
    setNewTargetPlayer({ id, target, dicesNumber });
  };

  const clickRenderEnd = () => setViewsRenderEnd(true);

  // const currentStepPlayer = players[currentPlayerStep]?.name;

  return (
    <>
      {/* Button убрать в VIEW
      <div>Игрок: {currentStepPlayer}</div>
      <button type="button" onClick={clickStartPlayerTurn}>
        Ходить
      </button>
 */}
      <Views
        mapData={MAP_DATA}
        players={players}
        newTargetPlayer={newTargetPlayer}
        renderEnd={clickRenderEnd}
        clickStartPlayerTurn={clickStartPlayerTurn}
      />
    </>
  );
};

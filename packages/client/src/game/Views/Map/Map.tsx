import type { FC } from 'react';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import type { StepsMove } from 'game/types/game';
import {
  calcPlayerParkingSpotCard,
  drawCard,
  getDirectionCard,
  playerMove,
} from 'game/helpers/helpers';
import type { PlayersPositions, TypeMapData } from 'game/types/map';
import { PLAYER_SPEED } from 'game/constants';

import './Map.scss';

type MapProps = {
  mapData: TypeMapData;
  playerTarget: Nullable<{ id: number; target: number }>;
  render: boolean;
  stopRender: (nextStep?: StepsMove) => void;
};

export const Map: FC<MapProps> = ({ mapData, playerTarget, render, stopRender }) => {
  const { mapSize, playerSize, cards, players } = mapData;

  const startPlayersPosition: PlayersPositions | [] = [];

  players?.forEach((item, key) => {
    const { id, color, currentCardId } = item;
    const [x, y] = calcPlayerParkingSpotCard(id, cards[currentCardId], playerSize);
    const direction = getDirectionCard(currentCardId);
    startPlayersPosition[key] = { id, color, x, y, direction };
  });

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const [animationStop, setAnimationStop] = useState<boolean>(true);

  const [animationCounter, setAnimationCounter] = useState<number>(0);

  const [playersPositions, setPlayersPositions] = useState(startPlayersPosition);

  // console.log(playersPositions);

  useEffect(() => {
    if (!render) return;
    if (playerTarget) {
      setAnimationStop(false);
    }
  }, [playerTarget, cards, render]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) return;

    canvas.width = mapSize;
    canvas.height = mapSize;

    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, mapSize, mapSize);

    cards.forEach((item) => drawCard(context, mapSize, item));

    if (playerTarget) {
      const { id, target } = playerTarget;
      // console.log(playerTarget);
      const targetPosition = calcPlayerParkingSpotCard(id, cards[target], playerSize);
      // console.log(playersPositions[id]);

      playersPositions.forEach((player, key: number) => {
        if (player.id === id) {
          const newPlayerPostion = playerMove(
            player,
            targetPosition,
            PLAYER_SPEED,
            mapSize,
            playerSize,
          );
          if (!newPlayerPostion) {
            setAnimationStop(true);

            return;
          }

          setPlayersPositions((prev) => {
            const playerPosition = [...prev];
            playerPosition[key] = { ...playerPosition[key], ...newPlayerPostion };

            return playerPosition;
          });
        }
      });
    }

    playersPositions.forEach(({ id, color, x, y }) => {
      if (players[id].leave) return;
      context.fillStyle = String(color);
      context.fillRect(Number(x), Number(y), playerSize, playerSize);
      context.strokeStyle = 'white';
      context.strokeRect(Number(x), Number(y), playerSize + 1, playerSize + 1);
    });
  }, [animationCounter, mapSize]);

  useLayoutEffect((): void | (() => void) => {
    if (!animationStop) {
      let timerId = 0;
      const animate = () => {
        setAnimationCounter((c) => c + 1);
        timerId = requestAnimationFrame(animate);
      };
      timerId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(timerId);
    }
    stopRender();

    return undefined;
  }, [animationStop]);

  return <canvas ref={canvasRef} />;
};

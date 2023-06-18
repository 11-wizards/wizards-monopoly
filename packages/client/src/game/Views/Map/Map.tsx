import type { FC } from 'react';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import type { StepsMove } from 'game/types/game';
import { calcPlayerParkingSpotCard, drawCard, playerMove } from 'game/helpers/helpers';

import './Map.scss';
import { MapDirectons, CornersCardsID, PlayersPositions, TypeMapData } from 'game/types/map';
import { PlayerTarget } from 'game/types/player';
import { PLAYER_SPEED } from 'game/constants';

const { RIGHT: startDirection } = MapDirectons;
const { CARD_TOP_LEFT: startCardId }: { CARD_TOP_LEFT: number } = CornersCardsID;

type MapProps = {
  render: boolean;
  mapData: TypeMapData;
  playerTarget: PlayerTarget;
  stopRender: (nextStep?: StepsMove) => void;
};

export const Map: FC<MapProps> = ({
  mapData,
  playerTarget,
  render,
  stopRender,
}) => {

  const { mapSize, playerSize, cards, players } = mapData;

  const startPlayersPosition: PlayersPositions | [] = [];

  players?.forEach((item, key) => {
    const { id, color, currentCardId, leave } = item;
    const [x, y] = calcPlayerParkingSpotCard(id, cards[currentCardId], playerSize);
    startPlayersPosition[key] = { id, color, x, y, direction: startDirection };
  });

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const [animationStop, setAnimationStop] = useState<boolean>(true);

  const [animationCounter, setAnimationCounter] = useState<number>(0);

  const [playersPositions, setPlayersPositions] = useState(startPlayersPosition);

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
      const targetPosition = calcPlayerParkingSpotCard(id, cards[target], playerSize);

      playersPositions.forEach((player, key: number) => {
        
        if (player.id === id) {
          const newPlayerPostion = playerMove(player, targetPosition, PLAYER_SPEED, mapSize, playerSize);
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

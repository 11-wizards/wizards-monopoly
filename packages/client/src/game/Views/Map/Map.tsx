import type { FC } from 'react';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { CornersCardsID, MapDirectons } from 'types/enums/main';
import type { PlayerTarget, PlayersPositions, Players, Card } from 'types/game';
import { calcPlayerParkingSpotCard, drawCard, playerMove } from 'game/helpers/helpers';
import type { CardData } from 'types/cards';

import './Map.scss';

const { RIGHT: startDirection } = MapDirectons;
const { CARD_TOP_LEFT: startCardId }: { CARD_TOP_LEFT: number } = CornersCardsID;

type MapProps = {
  mapData: {
    NUMBER_CARDS: number;
    SIZE_CORNER_CARDS: number;
    cards: Array<Card>;
    cardsData: Array<CardData>;
    interfaceSize: number;
    mapSize: number;
    playerSize: number;
    speed: number;
  };
  playerTarget: PlayerTarget;
  players: Players;
  setAnimationEnd: () => React.Dispatch<React.SetStateAction<boolean>> | void;
};

export const Map: FC<MapProps> = ({ mapData, players, playerTarget, setAnimationEnd }) => {
  const { mapSize, cardsData, speed, playerSize, cards } = mapData;

  const startPlayersPosition: PlayersPositions | [] = [];

  players?.forEach((item, key) => {
    const { id, color } = item;
    const [x, y] = calcPlayerParkingSpotCard(id, cards[startCardId], playerSize);
    startPlayersPosition[key] = { id, color, x, y, direction: startDirection };
  });

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const [animationStop, setAnimationStop] = useState<boolean>(true);

  const [animationCounter, setAnimationCounter] = useState<number>(0);

  const [playersPositions, setPlayersPositions] = useState(startPlayersPosition);

  useEffect(() => {
    if (playerTarget) {
      setAnimationStop(false);
    }
  }, [playerTarget]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) return;

    canvas.width = mapSize;
    canvas.height = mapSize;

    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, mapSize, mapSize);

    cards.forEach((item, key: number) => drawCard(context, mapSize, item, cardsData[key]));

    if (playerTarget) {
      const { id, target } = playerTarget;

      const targetPosition = calcPlayerParkingSpotCard(id, cards[target], playerSize);

      playersPositions.forEach((player, key: number) => {
        if (player.id === id) {
          const newPlayerPostion = playerMove(player, targetPosition, speed, mapSize, playerSize);
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

    playersPositions.forEach(({ color, x, y }) => {
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
    setAnimationEnd();

    return undefined;
  }, [animationStop]);

  return <canvas ref={canvasRef} />;
};

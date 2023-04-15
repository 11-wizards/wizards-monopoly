import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import type { MapData } from 'game/Game';
import { readyPositionCards, playerAnimationSteps } from '../../helpers/helpers';
import type { PlayersToMap } from '../Views';

import './Map.scss';

type Props = {
  players: PlayersToMap;
  goPlayer: Record<string, number> | null;
  setGoPlayer: () => React.Dispatch<React.SetStateAction<boolean>>;
  mapData: MapData;
};

export const Map = ({ mapData, players, goPlayer, setGoPlayer }: Props): JSX.Element => {
  const { MAP_SIZE, NUMBER_CARDS, SIZE_CORNER_CARDS, SPEED_ANIMATION } = mapData;

  const cardHeight: number = Math.round((MAP_SIZE / 100) * SIZE_CORNER_CARDS);
  const cardWidth: number = Math.round(
    (MAP_SIZE / 100) * ((100 - SIZE_CORNER_CARDS * 2) / ((NUMBER_CARDS - 4) / 4)),
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [shouldStop, setShouldStop] = useState<boolean>(true);

  const [playersPosition, setPlayersPosition] = useState(players);

  const [counter, setCounter] = useState<number>(0);

  const cards: number[][] = readyPositionCards(NUMBER_CARDS, cardWidth, cardHeight);

  useEffect(() => {
    setShouldStop(false);
  }, [goPlayer]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;
    const context = canvas.getContext('2d');
    if (context === null) return;
    context.clearRect(0, 0, 350, 350);
    cards.forEach((item, key) => {
      context.fillText(String(key), item[0] + 10, item[1] + 10);
      context.strokeRect(item[0], item[1], item[2], item[3]);
    });
    if (goPlayer !== null) {
      const { id, target } = goPlayer;
      const targetPosition = cards[target];

      playersPosition.forEach((player, key: number) => {
        if (player.id === id) {
          const newPlayerPostion = playerAnimationSteps(player, targetPosition, SPEED_ANIMATION);
          if (!newPlayerPostion) {
            setShouldStop(true);
            setGoPlayer();
          } else {
            setPlayersPosition((prev) => {
              const wwsd = [...prev];
              wwsd[key] = { ...wwsd[key], ...newPlayerPostion };

              return wwsd;
            });
          }
        }
      });
    }

    playersPosition.forEach(({ color, x, y }) => {
      context.fillStyle = String(color);
      context.fillRect(Number(x), Number(y), 18, 18);
    });
  }, [counter]);

  useLayoutEffect((): void | (() => void) => {
    if (!shouldStop) {
      let timerId = 0;
      const animate = () => {
        setCounter((c) => c + 1);
        timerId = requestAnimationFrame(animate);
      };
      timerId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(timerId);
    }

    return undefined;
  }, [shouldStop]);

  return <canvas ref={canvasRef} />;
};

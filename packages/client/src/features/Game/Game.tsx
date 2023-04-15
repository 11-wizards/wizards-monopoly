/* eslint @typescript-eslint/default-param-last: 0 */
import type { Dispatch, SetStateAction } from 'react';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import type { GoPlayer, Players } from 'pages/GamePage/GamePage';
import { cardsData } from 'models/cards.model';
import { readyPositionCards, playerAnimationSteps } from './helpers';

import './Game.scss';

const MAP_SIZE = 900;
const NUBER_CARDS = 40;
const SIZE_CORNER_CARDS = 13; // процент размера угловых карточек относительно поля

const SPEED_ANIMATION = 5;

const cardHeight: number = Math.round((MAP_SIZE / 100) * SIZE_CORNER_CARDS);
const cardWidth: number = Math.round(
  (MAP_SIZE / 100) * ((100 - SIZE_CORNER_CARDS * 2) / ((NUBER_CARDS - 4) / 4)),
);

interface Props {
  players: Players;
  goPlayer: GoPlayer | null;
  setGoPlayer: Dispatch<SetStateAction<GoPlayer | null>>;
}

export const Game = ({ players, goPlayer, setGoPlayer }: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [shouldStop, setShouldStop] = useState<boolean>(true);

  const [playersPosition, setPlayersPosition] = useState(players);

  const [counter, setCounter] = useState<number>(0);

  const cards: number[][] = readyPositionCards(NUBER_CARDS, cardWidth, cardHeight);

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
    cards.forEach((item = [0, 0, 0, 0], index) => {
      context.strokeRect(item[0], item[1], item[2], item[3]);
      const cardImage = new Image();
      const { imgSrc, title, priceView } = cardsData[index];
      cardImage.src = imgSrc;
      context.drawImage(cardImage, item[0] + 10, item[1] + 10, item[2] - 20, item[3] - 20);
      context.fillText(title, item[0] + 10, item[1] + 10);
      context.fillText(priceView, item[0] + 20, item[1] + 20);
      context.fillStyle = 'red';
    });
    if (goPlayer !== null) {
      const { id, target } = goPlayer;
      const targetPosition = cards[target];

      playersPosition.forEach((player, key: number) => {
        if (player.id === id) {
          const newPlayerPostion = playerAnimationSteps(
            player,
            targetPosition,
            SPEED_ANIMATION,
            MAP_SIZE,
          );
          if (!newPlayerPostion) {
            setShouldStop(true);
            setGoPlayer(null);
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

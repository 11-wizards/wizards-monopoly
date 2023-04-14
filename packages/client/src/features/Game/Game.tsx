import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PlayerPosition, PlayerTarget } from 'models/game.model';
import { selectPlayers } from 'app/slices/gameSlice';
import type { CardRect } from 'game/model';
import { useAppSelector } from 'hooks/redux';
import { initCardsPositions, initStartPlayersPositions, playerAnimationSteps } from './helpers';

import './Game.scss';

const MAP_SIZE = 900;
const CARDS_NUMBER = 40;
const SIZE_CORNER_CARDS = 13; // процент размера угловых карточек относительно поля

const SPEED_ANIMATION = 5;

const cardHeight: number = Math.round((MAP_SIZE / 100) * SIZE_CORNER_CARDS);
const cardWidth: number = Math.round(
  (MAP_SIZE / 100) * ((100 - SIZE_CORNER_CARDS * 2) / ((CARDS_NUMBER - 4) / 4)),
);

interface Props {
  playerMovingTarget: Nullable<PlayerTarget>;
  handlePlayerMovingTarget: Dispatch<SetStateAction<Nullable<PlayerTarget>>>;
}

export const Game: FC<Props> = ({ playerMovingTarget, handlePlayerMovingTarget }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const players = useAppSelector(selectPlayers);
  const [playersPositions, setPlayersPositions] = useState<PlayerPosition[]>(
    initStartPlayersPositions(players),
  );
  const [shouldStop, setShouldStop] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);
  const [cards] = useState<CardRect[]>(initCardsPositions(CARDS_NUMBER, cardWidth, cardHeight));

  useEffect(() => {
    setShouldStop(playerMovingTarget === null);
  }, [playerMovingTarget]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;
    const context = canvas.getContext('2d');
    if (context === null) return;
    context.clearRect(0, 0, 350, 350);
    cards.forEach((card) =>
      context.strokeRect(card.getX(), card.getY(), card.getWidth(), card.getHeight()),
    );
    if (playerMovingTarget !== null) {
      const { id, target } = playerMovingTarget;
      const targetPosition: CardRect = cards[target];

      playersPositions.forEach((position) => {
        if (position.id === id) {
          const newPlayerPosition = playerAnimationSteps(position, targetPosition, SPEED_ANIMATION);
          if (!newPlayerPosition) {
            setShouldStop(true);
            handlePlayerMovingTarget(null);
          } else {
            setPlayersPositions((prevState) => {
              const found = prevState.find((p) => p.id === id);
              if (found !== undefined) {
                return [newPlayerPosition, ...prevState.filter((pos) => pos.id !== found.id)];
              }

              return prevState;
            });
          }
        }
      });
    }

    playersPositions.forEach((position) => {
      const foundPlayer = players.find((player) => player.getId() === position.id);
      context.fillStyle = String(foundPlayer?.getColor());
      const { x, y } = position;
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

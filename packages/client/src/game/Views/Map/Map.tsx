import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { CornersCardsID, MapDirectons } from 'types/enums/main';
import type { MapData, PlayerTarget, PlayersPositions, Players } from 'types/game';
import { cardsData } from 'data/cards';
import { calcPlayerParkingSpotCard, initCardsPositions, playerMove } from '../../helpers/helpers';

import './Map.scss';

const { RIGHT: startDirection } = MapDirectons;
const { CARD_TOP_LEFT: startCardId } = CornersCardsID;

type Props = {
  players: Players;
  playerTarget: PlayerTarget;
  setAnimationEnd: () => React.Dispatch<React.SetStateAction<boolean>>;
  mapData: MapData;
};

export const Map = ({ mapData, players, playerTarget, setAnimationEnd }: Props): JSX.Element => {
  const { MAP_SIZE, NUMBER_CARDS, SIZE_CORNER_CARDS, ANIMATION_SPEED, PLAYER_SIZE } = mapData;

  const cardHeight: number = Math.round((MAP_SIZE / 100) * SIZE_CORNER_CARDS);
  const cardWidth: number = Math.round(
    (MAP_SIZE / 100) * ((100 - SIZE_CORNER_CARDS * 2) / ((NUMBER_CARDS - 4) / 4)),
  );

  const cards: number[][] = initCardsPositions(NUMBER_CARDS, cardWidth, cardHeight);

  const startPlayersPosition: PlayersPositions | [] = [];
  players?.forEach((item, key) => {
    const { id, color } = item;
    const [x, y] = calcPlayerParkingSpotCard(id, cards[startCardId], PLAYER_SIZE);
    startPlayersPosition[key] = { id, color, x, y, direction: startDirection };
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [animationStop, setAnimationStop] = useState<boolean>(true);

  const [animationCounter, setAnimationCounter] = useState<number>(0);

  const [playersPositions, setPlayersPositions] = useState(startPlayersPosition);

  useEffect(() => {
    setAnimationStop(false);
  }, [playerTarget]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;
    const context = canvas.getContext('2d');
    if (context === null) return;
    context.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
    cards.forEach((item, key) => {
      const cardImage = new Image();
      const { imgSrc, title, priceView } = cardsData[key];
      cardImage.src = imgSrc;
      context.drawImage(cardImage, item[0] + 10, item[1] + 10, item[2] - 20, item[3] - 20);
      context.fillText(title, item[0] + 10, item[1] + 10);
      context.fillText(priceView, item[0] + 20, item[1] + 20);
      context.fillStyle = 'red';
      const [y, x, w, h] = item;
      context.strokeRect(y, x, w, h);
    });
    if (playerTarget !== null) {
      const { id, target } = playerTarget;
      const targetPosition = calcPlayerParkingSpotCard(id, cards[target], PLAYER_SIZE);

      playersPositions.forEach((player, key: number) => {
        if (player.id === id) {
          const newPlayerPostion = playerMove(player, targetPosition, ANIMATION_SPEED);
          if (!newPlayerPostion) {
            setAnimationStop(true);
            setAnimationEnd();
          } else {
            setPlayersPositions((prev) => {
              const playerPosition = [...prev];
              playerPosition[key] = { ...playerPosition[key], ...newPlayerPostion };

              return playerPosition;
            });
          }
        }
      });
    }

    playersPositions.forEach(({ color, x, y }) => {
      context.fillStyle = String(color);
      context.fillRect(Number(x), Number(y), PLAYER_SIZE, PLAYER_SIZE);
    });
  }, [animationCounter]);

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

    return undefined;
  }, [animationStop]);

  return <canvas ref={canvasRef} />;
};

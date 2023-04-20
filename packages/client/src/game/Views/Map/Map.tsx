import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { CornersCardsID, MapDirectons } from 'types/enums/main';
import type { PlayerTarget, PlayersPositions, Players } from 'types/game';
import { cardsData } from 'data/cards';
import { calcPlayerParkingSpotCard, playerMove } from '../../helpers/helpers';

import './Map.scss';

const { RIGHT: startDirection } = MapDirectons;
const { CARD_TOP_LEFT: startCardId }: { CARD_TOP_LEFT: number } = CornersCardsID;

type Props = {
  players: Players;
  playerTarget: PlayerTarget;
  setAnimationEnd: () => React.Dispatch<React.SetStateAction<boolean>>;
  mapData: {
    mapSize: number;
    playerSize: number;
    cards: number[][];
    interfaceSize: number;
    speed: number;
    SIZE_CORNER_CARDS: number;
    NUMBER_CARDS: number;
  };
};

export const Map = ({ mapData, players, playerTarget, setAnimationEnd }: Props): JSX.Element => {
  const { mapSize, speed, playerSize, cards } = mapData;

  const startPlayersPosition: PlayersPositions | [] = [];

  players?.forEach((item, key) => {
    const { id, color } = item;
    const [x, y] = calcPlayerParkingSpotCard(id, cards[startCardId], playerSize);
    startPlayersPosition[key] = { id, color, x, y, direction: startDirection };
  });

  const [cardDataImg, setCardDataImg] = useState<Array<CanvasImageSource>>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const context = canvas.getContext('2d');
    if (context === null) return;
    context.clearRect(0, 0, mapSize, mapSize);
    cards.forEach((item, key: number) => {
      const [x, y, w, h] = item;
      const { imgSrc, title, priceView } = cardsData[key];
      let imgSizes = [x, y, w, h];
      if (w === h) {
        imgSizes = [x, y, w, h];
      } else if (w > h) {
        imgSizes = [x + w / 2 - h / 2 / 2, y + h / 2 - h / 2 / 2, h / 2, h / 2];
      } else {
        imgSizes = [x + w / 2 - w / 2 / 2, y + h / 2 - w / 2 / 2, w / 2, w / 2];
      }

      if (!cardDataImg[key]) {
        const cardImage = new Image();
        cardImage.src = imgSrc;
        cardImage.onload = () => {
          setCardDataImg((prev) => {
            const data: Array<CanvasImageSource> = [...prev];
            data[key] = cardImage;

            return data;
          });
          context.drawImage(cardImage, imgSizes[0], imgSizes[1], imgSizes[2], imgSizes[3]);
          if (key === 0) {
            playersPositions.forEach(({ color, x: pX, y: pY }) => {
              context.fillStyle = String(color);
              context.fillRect(Number(pX), Number(pY), playerSize, playerSize);
            });
          }
        };
      } else {
        context.drawImage(cardDataImg[key], imgSizes[0], imgSizes[1], imgSizes[2], imgSizes[3]);
      }
      context.fillText(title, item[0] + 10, item[1] + 10);
      context.fillText(priceView, item[0] + 10, item[1] + 20);
      context.fillStyle = 'red';
      context.strokeRect(x, y, w, h);
    });
    if (playerTarget !== null) {
      const { id, target } = playerTarget;

      const targetPosition = calcPlayerParkingSpotCard(id, cards[target], playerSize);

      playersPositions.forEach((player, key: number) => {
        if (player.id === id) {
          const newPlayerPostion = playerMove(player, targetPosition, speed, mapSize, playerSize);
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
      context.fillRect(Number(x), Number(y), playerSize, playerSize);
    });
  }, [animationCounter, mapData]);
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

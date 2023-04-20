import { MAP_SIZES_PRECENT } from 'game/common';
import { initCardsPositions } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';

export type TypeUseGameViewsCalc = {
  mapSize: number;
  playerSize: number;
  cards: number[][];
  interfaceSize: number;
  speed: number;
  SIZE_CORNER_CARDS: number;
  NUMBER_CARDS: number;
} | null;

export const useGameViewsCalc = (): TypeUseGameViewsCalc => {
  const { MAP_SIZE, NUMBER_CARDS, SIZE_CORNER_CARDS, PLAYER_SIZE } = MAP_SIZES_PRECENT;

  const [mapData, setMapData] = useState<TypeUseGameViewsCalc>(null);

  const calcMapData = () => {
    const baseSize =
      document.documentElement.clientHeight < document.documentElement.clientWidth
        ? Number(document.documentElement.clientHeight)
        : Number(document.documentElement.clientWidth);
    const mapSize = Math.round((baseSize / 100) * MAP_SIZE);

    const playerSize = Math.round((mapSize / 100) * PLAYER_SIZE);
    const cardHeight: number = Math.round((mapSize / 100) * SIZE_CORNER_CARDS);
    const cardWidth: number = Math.round(
      (mapSize / 100) * ((100 - SIZE_CORNER_CARDS * 2) / ((NUMBER_CARDS - 4) / 4)),
    );
    const interfaceSize = Math.round(mapSize - (mapSize / 100) * SIZE_CORNER_CARDS * 2 - 20);
    const cards: number[][] = initCardsPositions(NUMBER_CARDS, cardWidth, cardHeight);
    setMapData({
      mapSize,
      playerSize,
      cards,
      interfaceSize,
      speed: 5,
      SIZE_CORNER_CARDS,
      NUMBER_CARDS,
    });
  };

  useEffect(() => {
    calcMapData();
    window.addEventListener('resize', calcMapData);

    return () => window.removeEventListener('resize', calcMapData);
  }, []);

  return mapData;
};

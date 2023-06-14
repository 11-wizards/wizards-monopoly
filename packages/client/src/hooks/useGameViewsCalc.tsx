import { MAP_SIZES_PRECENT } from 'game/common';
import { initCardsPositions } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';
import type { Card } from 'game/types/game';

export type TypeUseGameViewsCalc = {
  NUMBER_CARDS: number;
  SIZE_CORNER_CARDS: number;
  cards: Array<Card>;
  interfaceSize: number;
  mapSize: number;
  playerSize: number;
  speed: number;
} | null;

export const useGameViewsCalc = (): TypeUseGameViewsCalc => {
  const { MAP_SIZE, NUMBER_CARDS, SIZE_CORNER_CARDS, PLAYER_SIZE } = MAP_SIZES_PRECENT;

  const [mapData, setMapData] = useState<TypeUseGameViewsCalc>(null);

  const calcMapData = () => {
    if (typeof window !== 'undefined') {
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
      const cards: Card[] = initCardsPositions(NUMBER_CARDS, cardWidth, cardHeight);
      setMapData({
        mapSize,
        playerSize,
        cards,
        interfaceSize,
        speed: 5,
        SIZE_CORNER_CARDS,
        NUMBER_CARDS,
      });
    }
  };

  useEffect(() => {
    calcMapData();
    window.addEventListener('resize', calcMapData);

    return () => window.removeEventListener('resize', calcMapData);
  }, []);

  return mapData;
};

import { initCardsPositions } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';
import { MAP_SIZE, PLAYER_SIZE, SIZE_CORNER_CARDS, NUMBER_CARDS } from 'game/constants';

export type TypeUseGameViewsCalc = {
  cards: Array<{
    h: number;
    w: number;
    x: number;
    y: number;
  }>;
  interfaceSize: number;
  mapSize: number;
  playerSize: number;
} | null;

export const useGameViewsCalc = (): TypeUseGameViewsCalc => {
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
      const cards = initCardsPositions(NUMBER_CARDS, cardWidth, cardHeight);

      setMapData({
        mapSize,
        playerSize,
        cards,
        interfaceSize,
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

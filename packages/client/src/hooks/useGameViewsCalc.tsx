import { MAP_SIZES_PRECENT } from 'game/common';
import { initCardsPositions } from 'game/helpers/helpers';
import { useEffect, useState } from 'react';

export const useGameViewsCalc = () => {
  const { MAP_SIZE, NUMBER_CARDS, SIZE_CORNER_CARDS, PLAYER_SIZE } = MAP_SIZES_PRECENT;

  const [mapData, setMapData] = useState({});

  const calcMapData = () => {
    console.log('calck');

    const mapSize = (document.documentElement.clientHeight / 100) * MAP_SIZE;
    const playerSize = (mapSize / 100) * PLAYER_SIZE;
    const cardHeight: number = Math.round((mapSize / 100) * SIZE_CORNER_CARDS);
    const cardWidth: number = Math.round(
      (mapSize / 100) * ((100 - SIZE_CORNER_CARDS * 2) / ((NUMBER_CARDS - 4) / 4)),
    );
    const cards: number[][] = initCardsPositions(NUMBER_CARDS, cardWidth, cardHeight);
    setMapData({ mapSize, playerSize, cards });
  };

  useEffect(() => {
    calcMapData();

    window.addEventListener('resize', calcMapData);

    return () => window.removeEventListener('resize', calcMapData);
  }, []);

  return mapData;
};

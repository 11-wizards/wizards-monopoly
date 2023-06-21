import type { PlayerColor } from 'types/enums/main';
import { START_PLAYER_BALANCE, START_PLAYER_CARD_ID } from 'constants/main';
import type { GameSetupFormData } from 'features/GameSetup/types';
import { isArray } from 'helpers';
import type { GamePlayerResult, Player } from 'game/types/game';
import type { GameState } from './gameSlice';

export function convertFormPlayersToPlayersObject(formPlayers: GameSetupFormData): Player[] {
  const keys = Object.keys(formPlayers);
  const playersCount = keys.filter((key) => key.includes('name')).length;
  const playersObject: Record<number, { color: PlayerColor; name: string }> = {};

  keys.forEach((key) => {
    const splitKey = key.split('_');
    const [_, propertyName, keyNumStr] = splitKey;
    const value = formPlayers[key];
    const keyNum = Number(keyNumStr);
    if (propertyName === 'name' || propertyName === 'color') {
      playersObject[keyNum] = {
        ...playersObject[keyNum],
        [propertyName]: value,
      };
    }
  });

  const players: Player[] = [];

  for (let i = 0; i < playersCount; i += 1) {
    const { name, color } = playersObject[i];
    const id = i;
    players.push({
      id,
      name,
      color,
      currentCardId: START_PLAYER_CARD_ID,
      balance: START_PLAYER_BALANCE,
      leave: false,
    });
  }

  return players;
}

export const setGameDataLocalStorage = (data: GameState) => {
  if (typeof window !== 'undefined') {
    localStorage.game = JSON.stringify(data);
  }
};
export const getGameDataLocalStorage = (): GameState | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const data: string = localStorage.getItem('game') as string;
  if (!data || typeof data !== 'string') return null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedData: GameState = JSON.parse(data);

  const { cardsData, results, players, randomCards, currentPlayer, gameTimeStamp } = parsedData;
  if (
    isArray(cardsData) &&
    isArray(results) &&
    isArray(players) &&
    isArray(randomCards) &&
    typeof currentPlayer === 'number' &&
    typeof gameTimeStamp === 'number'
  )
    return parsedData;

  return null;
};
export const clearGameDataLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('game');
  }
};

export const calcGameTime = (gameTimeStamp: number): string => {
  const start = new Date(gameTimeStamp);
  const end = new Date();
  const msDiff = Math.abs(end.getTime() - start.getTime());
  const hoursDiff = Math.floor(msDiff / 1000 / 60 / 60);
  const minutesDiff = Math.floor((msDiff / 1000 / 60) % 60);
  console.log(`${hoursDiff} часов ${minutesDiff} минут`);

  return `${hoursDiff}:${minutesDiff}`;
};

export const resultsSort = (resultA: GamePlayerResult, resultB: GamePlayerResult): number => {
  if (typeof resultA.place !== 'number' || typeof resultB.place !== 'number') {
    return 0;
  }

  return resultA.place - resultB.place;
};

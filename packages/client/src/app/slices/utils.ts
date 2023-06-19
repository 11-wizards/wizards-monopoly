import type { PlayerColor } from 'types/enums/main';
import { START_PLAYER_BALANCE, START_PLAYER_CARD_ID } from 'constants/main';
import type { GameSetupFormData } from 'features/GameSetup/types';
import { isArray } from 'helpers';
import type { Player } from 'game/types/game';
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

  const { cardsData, players, randomCards, currentPlayer } = parsedData;
  if (
    isArray(cardsData) &&
    isArray(players) &&
    isArray(randomCards) &&
    typeof currentPlayer === 'number'
  )
    return parsedData;

  return null;
};
export const clearGameDataLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('game');
  }
};

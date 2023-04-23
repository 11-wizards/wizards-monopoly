import type { PlayerColor } from 'types/enums/main';
import type { Player } from 'types/game';
import { START_PLAYER_BALANCE, START_PLAYER_CARD_ID } from 'constants/main';
import type { GameSetupFormData } from 'features/GameSetup/types';

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

  for (let i = 1; i <= playersCount; i += 1) {
    const { name, color } = playersObject[i];
    const id = i;
    players.push({
      id,
      name,
      color,
      currentCardId: START_PLAYER_CARD_ID,
      balance: START_PLAYER_BALANCE,
    });
  }

  return players;
}

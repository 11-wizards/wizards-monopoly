import type { GameSetupFormData } from 'features/GameSetup/types';
import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  buttonStart: { id: 'start.button.start' },

  textChoose: { id: 'start.text.choose' },
  playerName: { id: 'start.player.name' },
  playerColor: { id: 'start.player.color' },
  errorRequired: { id: 'validation.required-field' },
  errorMinLength: { id: 'validation.min-length.player_name' },
  errorMaxLength: { id: 'validation.max-length.player_name' },
  errorPattern: { id: 'validation.pattern.player_name' },
  errorColorsUnique: { id: 'validation.unique.color' },
});
export const createPlayersArray = (length: Nullable<number>) =>
  Array.from({ length: length || 0 }).map((_, i) => ({
    id: `${i}-player`,
  }));
export const isUniqueColors = (colors: string[]) => {
  const colorsSet = new Set(colors);

  return colorsSet.size === colors.length;
};
export const checkUniquenessColors = (data: GameSetupFormData) => {
  const colors = Object.entries(data)
    .filter(([key]) => key.includes('color'))
    .map(([_, value]) => value);

  return isUniqueColors(colors);
};

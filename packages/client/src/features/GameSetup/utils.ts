import type { GameSetupFormData } from './types';

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

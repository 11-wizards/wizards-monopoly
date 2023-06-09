import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  buttonStart: { id: 'start.button.start', defaultMessage: 'Start game' },
  textChoose: { id: 'start.text.choose', defaultMessage: 'Choose the number of players:' },
  textOldGame: {
    id: 'start.text.old-game',
    defaultMessage: 'An incomplete game session was detected!',
  },
  restoreGame: {
    id: 'start.text.restore-game',
    defaultMessage: 'Restore Session',
  },
  deleteGame: {
    id: 'start.text.delete-game',
    defaultMessage: 'Delete a session',
  },
  playerName: {
    id: 'start.player.name',
    defaultMessage: 'Choose the name of the {num, number}nd player:',
  },
  playerColor: {
    id: 'start.player.color',
    defaultMessage: 'Choose the color of the {num, number}nd player:',
  },
  errorRequired: { id: 'validation.required-field', defaultMessage: 'This field is required' },
  errorMinLength: {
    id: 'validation.min-length.player_name',
    defaultMessage: 'Player name must be at least {min, number} character',
  },
  errorMaxLength: {
    id: 'validation.max-length.player_name',
    defaultMessage: 'Player name cannot be longer than {max, number} characters',
  },
  errorPattern: {
    id: 'validation.pattern.player_name',
    defaultMessage: 'Player name can only contain letters and numbers',
  },
  errorColorsUnique: { id: 'validation.unique.color', defaultMessage: 'Colors must be unique' },
});

export const createPlayersArray = (length: Nullable<number>) =>
  Array.from({ length: length || 0 }).map((_, i) => ({
    id: `${i}-player`,
  }));

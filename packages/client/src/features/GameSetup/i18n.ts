import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  buttonStart: { id: 'start.button.start' },

  textChoose: { id: 'start.text.choose' },
  playerName: {
    id: 'start.player.name',
    defaultMessage: 'Введите имя {numPlayer, number}-го игрока:',
  },
});

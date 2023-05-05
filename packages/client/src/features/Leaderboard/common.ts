import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: { id: 'leaderboard.title', defaultMessage: 'Monopoly Game Leaderboard' },
  profit: { id: 'leaderboard.profit', defaultMessage: '$ profit' },
  daysInGame: { id: 'leaderboard.days-in-game', defaultMessage: 'days in the game' },
});

export const dataExample = [
  {
    data: {
      name: 'Илья',
      profit: 500000,
      gameTime: '150',
    },
  },
  {
    data: {
      name: 'Анна',
      profit: 62000,
      gameTime: '1 день',
    },
  },
  {
    data: {
      name: 'Евгений',
      profit: 16000,
      gameTime: '110',
    },
  },
  {
    data: {
      name: 'Андрей',
      profit: 15000,
      gameTime: '100',
    },
  },
  {
    data: {
      name: 'Антон',
      profit: 14000,
      gameTime: '10',
    },
  },
  {
    data: {
      name: 'Мария',
      profit: 13400,
      gameTime: '500',
    },
  },
  {
    data: {
      name: 'Елена',
      profit: 12000,
      gameTime: '100',
    },
  },
  {
    data: {
      name: 'Тимур',
      profit: 12000,
      gameTime: '123',
    },
  },
  {
    data: {
      name: 'Константин',
      profit: 10450,
      gameTime: '67',
    },
  },
  {
    data: {
      name: 'Сергей',
      profit: 10220,
      gameTime: '58',
    },
  },
];

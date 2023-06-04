import { defineMessages } from 'react-intl';
import { ROUTES } from 'core/Router';

export const messages = defineMessages({
  buttonRules: { id: 'header.navbar.rules', defaultMessage: 'Game rules' },
  buttonSignOut: { id: 'universal.signout', defaultMessage: 'Sign out' },
  buttonTitle: { id: 'project.name', defaultMessage: 'Monopoly' },
});

type HeaderLink = {
  key: string;
  link: string;
};

export const headerLinks: HeaderLink[] = [
  {
    key: 'forum',
    link: ROUTES.FORUM_PAGE.path,
  },
  {
    key: 'leaderboard',
    link: ROUTES.LEADERBOARD_PAGE.path,
  },
  {
    key: 'profile',
    link: ROUTES.PROFILE_PAGE.path,
  },
];

export const pathsWithRulesModal = ['/', '/start-game', '/game'];

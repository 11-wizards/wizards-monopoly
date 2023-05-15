import {
  EndGamePage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  ProfilePage,
  RegisterPage,
  StartGamePage,
} from 'pages';

export const ROUTES = {
  ROOT: {
    path: '/',
    index: true,
    element: <MainPage />,
  },
  REGISTER_PAGE: {
    path: '/register',
    element: <RegisterPage />,
  },
  LOGIN_PAGE: {
    path: '/login',
    element: <LoginPage />,
  },
  FORUM_PAGE: {
    path: '/forum',
    element: <ForumPage />,
  },
  START_GAME_PAGE: {
    path: '/start-game',
    element: <StartGamePage />,
  },
  GAME_PAGE: {
    path: '/game',
    element: <GamePage />,
  },
  END_GAME_PAGE: {
    path: '/end-game',
    element: <EndGamePage />,
  },
  LEADERBOARD_PAGE: {
    path: '/leaderboard',
    element: <LeaderboardPage />,
  },
  PROFILE_PAGE: {
    path: '/profile',
    element: <ProfilePage />,
  },
  PROFILE_CHANGE_PASSWORD_PAGE: {
    path: '/profile/change-password',
    element: <ProfilePage />,
  },
};

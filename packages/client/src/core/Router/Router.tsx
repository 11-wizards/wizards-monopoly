import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Default } from 'layouts';
import {
  ErrorPage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  RegisterPage,
  StartGamePage,
} from 'pages';
import { ROUTES } from './routes';
import { EndGamePage } from '../../pages/EndGamePage';

export const Router = () => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: ROUTES.ROOT.path,
        element: <Default />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: ROUTES.REGISTER_PAGE.path,
            element: <RegisterPage />,
          },
          {
            path: ROUTES.LOGIN_PAGE.path,
            element: <LoginPage />,
          },
          {
            path: ROUTES.FORUM_PAGE.path,
            element: <ForumPage />,
          },
          {
            path: ROUTES.GAME_PAGE.path,
            element: <GamePage />,
          },
          {
            path: ROUTES.END_GAME_PAGE.path,
            element: <EndGamePage />,
          },
          {
            path: ROUTES.LEADERBOARD_PAGE.path,
            element: <LeaderboardPage />,
          },
          {
            path: ROUTES.START_GAME_PAGE.path,
            element: <StartGamePage />,
          },
        ],
      },
    ])}
  />
);

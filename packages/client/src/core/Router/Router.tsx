import { Routes, Route } from 'react-router-dom';
import {
  EndGamePage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  ProfileChangePasswordPage,
  ProfilePage,
  RegisterPage,
  StartGamePage,
} from 'pages';
import { ROUTES } from './routes';

export const Router = () => (
  <Routes>
    <Route index path={ROUTES.ROOT.path} element={<MainPage />} />
    <Route path={ROUTES.REGISTER_PAGE.path} element={<RegisterPage />} />
    <Route path={ROUTES.LOGIN_PAGE.path} element={<LoginPage />} />
    <Route path={ROUTES.FORUM_PAGE.path} element={<ForumPage />} />
    <Route path={ROUTES.GAME_PAGE.path} element={<GamePage />} />
    <Route path={ROUTES.END_GAME_PAGE.path} element={<EndGamePage />} />
    <Route path={ROUTES.LEADERBOARD_PAGE.path} element={<LeaderboardPage />} />
    <Route path={ROUTES.PROFILE_PAGE.path} element={<ProfilePage />} />
    <Route
      path={ROUTES.PROFILE_CHANGE_PASSWORD_PAGE.path}
      element={<ProfileChangePasswordPage />}
    />
    <Route path={ROUTES.START_GAME_PAGE.path} element={<StartGamePage />} />
  </Routes>
);

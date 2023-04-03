import type { FC } from 'react';
import { Leaderboard } from 'features/Leaderboard';
import './LeaderboardPage.scss';

export const LeaderboardPage: FC = () => (
  <div className="wrapper_leaderboardPage">
    <Leaderboard />
  </div>
);

import { FC } from 'react';
import { Leaderboard } from 'features/Leaderboard';

import './LeaderboardPage.scss';

export const LeaderboardPage: FC = () => {
  return (
    <div className="wrapper_leaderboardPage">
      <Leaderboard />
    </div>
  );
};

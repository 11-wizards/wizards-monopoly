import { api } from 'api';
import type { LeaderboardPayer } from 'models/leaderboard.model';
import { LeaderboardDto } from 'models/leaderboard.model';
import { TEAM_NAME } from 'constants/leaderboard';

export const authApi = {
  getLeaderboard: () =>
    api.post<Array<LeaderboardPayer>>(`/leaderboard/${TEAM_NAME}`, new LeaderboardDto()),
};

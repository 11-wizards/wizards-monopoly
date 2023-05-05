import { api } from 'api';
import type { LeaderboardPayer } from 'models/leaderboard.model';
import { LeaderboardDto } from 'models/leaderboard.model';

export const leaderboardApi = {
  getLeaderboard: (teamName: string, ratingFieldName: string, limit?: number) =>
    api.post<Array<LeaderboardPayer>>(
      `/leaderboard/${teamName}`,
      new LeaderboardDto(ratingFieldName, limit),
    ),
};

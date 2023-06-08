import { yandexApi } from 'api';
import type { LeaderboardPayer, LeaderboardPayerData } from 'models/leaderboard.model';
import { AddLeaderDto, GetLeaderboardDto } from 'models/leaderboard.model';

export const leaderboardApi = {
  getLeaders: (teamName: string, ratingFieldName: string, limit?: number) =>
    yandexApi.post<Array<LeaderboardPayer>>(
      `/leaderboard/${teamName}`,
      new GetLeaderboardDto(ratingFieldName, limit),
    ),
  addLeader: (ratingFieldName: string, teamName: string, data: LeaderboardPayerData) =>
    yandexApi.post<void>(`/leaderboard`, new AddLeaderDto(ratingFieldName, teamName, data)),
};

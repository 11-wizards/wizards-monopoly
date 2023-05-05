import { LEADERBOARD_LIMIT, RATING_FIELD_NAME } from 'constants/leaderboard';

export type LeaderboardPayer = {
  data: {
    gameTime: string;
    name: string;
    profit: number;
  };
};

export class LeaderboardDto {
  ratingFieldName: string;
  cursor = 0;
  limit = 0;

  constructor() {
    this.ratingFieldName = RATING_FIELD_NAME;
    this.limit = LEADERBOARD_LIMIT;
  }
}

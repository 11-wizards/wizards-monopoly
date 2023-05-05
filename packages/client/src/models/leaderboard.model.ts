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

  constructor(ratingFieldName: string, limit = 10) {
    this.ratingFieldName = ratingFieldName;
    this.limit = limit;
  }
}

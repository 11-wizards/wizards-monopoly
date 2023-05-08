export type LeaderboardPayer = {
  data: {
    gameTime: string;
    name: string;
    profit: number;
  };
};

export type LeaderboardPayerData = {
  gameTime: string;
  name: string;
  profit: number;
};

export class GetLeaderboardDto {
  ratingFieldName: string;
  cursor = 0;
  limit = 0;

  constructor(ratingFieldName: string, limit = 10) {
    this.ratingFieldName = ratingFieldName;
    this.limit = limit;
  }
}

export class AddLeaderDto {
  ratingFieldName: string;
  teamName: string;
  data: LeaderboardPayerData;

  constructor(ratingFieldName: string, teamName: string, data: LeaderboardPayerData) {
    this.ratingFieldName = ratingFieldName;
    this.teamName = teamName;
    this.data = data;
  }
}

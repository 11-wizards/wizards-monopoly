import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LeaderboardPayer, LeaderboardPayerData } from 'models/leaderboard.model';
import { leaderboardApi } from 'api/leaderboard.api';
import { LEADERBOARD_LIMIT, RATING_FIELD_NAME, TEAM_NAME } from 'constants/leaderboard';
import type { RootState } from '../store';

type LeaderboardState = {
  isLoading: boolean;
  leaders: LeaderboardPayer[];
};

const initialState: LeaderboardState = {
  leaders: [],
  isLoading: false,
};

export const fetchLeaders = createAsyncThunk('leaderboard/fetchLeaders', async () => {
  const response = await leaderboardApi.getLeaders(TEAM_NAME, RATING_FIELD_NAME, LEADERBOARD_LIMIT);
  if (response.status === 200) {
    return response.data;
  }

  return null;
});

export const fetchNewLeader = createAsyncThunk(
  'leaderboard/fetchNewLeader',
  async (data: LeaderboardPayerData) => {
    const response = await leaderboardApi.addLeader(RATING_FIELD_NAME, TEAM_NAME, data);
    if (response.status === 200) {
      return true;
    }

    return null;
  },
);

export const ITEMS_PER_PAGE = 30;

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaders.fulfilled, (state: LeaderboardState, action) => {
        state.isLoading = false;
        const leaders = action.payload;
        if (leaders !== null) {
          state.leaders = leaders;
        }
      })
      .addCase(fetchLeaders.pending, (state: LeaderboardState) => {
        state.isLoading = true;
      })
      .addCase(fetchLeaders.rejected, (state: LeaderboardState) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchNewLeader.fulfilled, (state: LeaderboardState) => {
        state.isLoading = false;
      })
      .addCase(fetchNewLeader.pending, (state: LeaderboardState) => {
        state.isLoading = true;
      })
      .addCase(fetchNewLeader.rejected, (state: LeaderboardState) => {
        state.isLoading = false;
      });
  },
});

export const selectLeaders = (rootState: RootState) => rootState.leaderboard.leaders;

export default leaderboardSlice.reducer;

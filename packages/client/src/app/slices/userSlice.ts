import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { CurrentUser } from 'models/auth.model';
import type { RootState } from '../store';

type UserState = {
  currentUser: Nullable<CurrentUser>;
  isAuth: boolean;
  isLoading: boolean;
};

const initialState: UserState = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export const selectIsAuth = createSelector(
  (state: RootState) => state.user.isAuth,
  (isAuth: boolean) => isAuth,
);

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

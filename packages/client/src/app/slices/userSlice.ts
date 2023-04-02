import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CurrentUser } from 'models/auth.model';

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

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

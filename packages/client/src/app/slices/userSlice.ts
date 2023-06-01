import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { authApi } from 'api/auth.api';
import { profileApi } from 'api/profile.api';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { handleServerError } from 'helpers/handleServerError';
import type { CurrentUser, CurrentUserDto } from 'models/auth.model';
import type { ProfileInput } from 'models/profile.model';
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

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
  try {
    const response = await authApi.getCurrentUser();

    if (response.status === 200) {
      return { ...response.data };
    }
  } catch (err) {
    await handleServerError(err as ServerError);
  }
});

export const changeProfileAvatar = createAsyncThunk(
  'user/changeProfileAvatar',
  async (data: UploadRequestOption) => {
    const formData = new FormData();
    formData.append('avatar', data.file);

    try {
      const response = await profileApi.changeAvatar(formData);

      if (response.status === 200) {
        return { ...response.data } as CurrentUserDto;
      }
    } catch (err) {
      await handleServerError(err as ServerError);
    }
  },
);

export const changeProfileInfo = createAsyncThunk(
  'user/changeProfileInfo',
  async (values: ProfileInput) => {
    try {
      const response = await profileApi.changeProfileInfo(values);

      if (response.status === 200) {
        return { ...response.data };
      }
    } catch (err) {
      await handleServerError(err as ServerError);
    }
  },
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  try {
    const response = await authApi.logOut();

    if (response.status === 200) {
      localStorage.removeItem(LOCAL_STORAGE_IS_AUTH_KEY);
    }
  } catch (err) {
    await handleServerError(err as ServerError);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const {
          id,
          first_name: firstName,
          second_name: secondName,
          display_name: displayName,
          login,
          email,
          phone,
          avatar,
        } = action.payload as CurrentUserDto;

        state.isLoading = false;
        state.isAuth = true;
        state.currentUser = {
          id,
          firstName,
          secondName,
          displayName,
          login,
          email,
          phone,
          avatar,
        };
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });
    // change profile avatar
    builder
      .addCase(changeProfileAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProfileAvatar.fulfilled, (state, action) => {
        const {
          id,
          first_name: firstName,
          second_name: secondName,
          display_name: displayName,
          login,
          email,
          phone,
          avatar,
        } = action.payload as CurrentUserDto;

        state.isLoading = false;
        state.currentUser = {
          id,
          firstName,
          secondName,
          displayName,
          login,
          email,
          phone,
          avatar,
        };
      })
      .addCase(changeProfileAvatar.rejected, (state) => {
        state.isLoading = false;
      });
    // change profile info
    builder
      .addCase(changeProfileInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProfileInfo.fulfilled, (state, action) => {
        const {
          id,
          first_name: firstName,
          second_name: secondName,
          display_name: displayName,
          login,
          email,
          phone,
          avatar,
        } = action.payload as CurrentUserDto;

        state.isLoading = false;
        state.currentUser = {
          id,
          firstName,
          secondName,
          displayName,
          login,
          email,
          phone,
          avatar,
        };
      })
      .addCase(changeProfileInfo.rejected, (state) => {
        state.isLoading = false;
      });
    // sign out
    builder
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.currentUser = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectCurrentUser = createSelector(
  (state: RootState) => state.user.currentUser,
  (currentUser: CurrentUser) => currentUser,
);

export const selectIsAuth = createSelector(
  (state: RootState) => state.user.isAuth,
  (isAuth: boolean) => isAuth,
);

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

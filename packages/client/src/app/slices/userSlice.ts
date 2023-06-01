import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { authApi } from 'api/auth.api';
import { profileApi } from 'api/profile.api';
import { themeApi } from 'api/theme.api';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';
import { DEFAULT_THEME, SITE_THEMES } from 'constants/theme';
import { handleServerError } from 'helpers/handleServerError';
import type { CurrentUser, CurrentUserDto } from 'models/auth.model';
import type { ProfileInput } from 'models/profile.model';
import { type CurrentUserTheme, type ChangeUserThemeInput } from 'models/theme.model';
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
  const result: Partial<CurrentUser> = {};

  try {
    const currentUserResponse = await authApi.getCurrentUser();

    if (currentUserResponse.status === 200) {
      Object.entries(currentUserResponse.data).forEach(([key, value]) => {
        // TODO: написать типизацию для result
        // @ts-ignore
        result[key] = value;
      });
    }

    if (result.id) {
      const currentUserThemeResponse = await themeApi.getCurrentUserTheme({
        device: 'default',
        userId: result.id,
      });

      // TODO: получать темы с бэка
      result.theme = SITE_THEMES.includes(currentUserThemeResponse.data.theme)
        ? currentUserThemeResponse.data
        : DEFAULT_THEME;
    }
  } catch (err) {
    await handleServerError(err as ServerError);
  }

  return result;
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

export const changeUserTheme = createAsyncThunk(
  'theme/changeUserTheme',
  async (values: ChangeUserThemeInput) => {
    try {
      const response = await themeApi.setCurrentUserTheme(values);

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
          theme,
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
          theme,
        };

        document.querySelector('html')?.setAttribute('theme', theme?.theme || 'light');
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
    // change user theme
    builder
      .addCase(changeUserTheme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserTheme.fulfilled, (state, action) => {
        const { device, theme } = action.payload as CurrentUserTheme;
        state.isLoading = false;
        state.currentUser!.theme = { device, theme };

        document.querySelector('html')?.setAttribute('theme', theme);
      })
      .addCase(changeUserTheme.rejected, (state) => {
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

export const selectIsAuth = createSelector(
  (state: RootState) => state.user.isAuth,
  (isAuth: boolean) => isAuth,
);

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

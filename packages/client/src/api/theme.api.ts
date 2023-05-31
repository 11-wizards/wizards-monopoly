import { ownApi } from 'api';
import {
  type ChangeUserThemeInput,
  type CurrentUserTheme,
  type UserThemeInput,
  UserThemeInputDto,
  ChangeUserThemeInputDto,
} from 'models/theme.model';

export const themeApi = {
  getCurrentUserTheme: (data: UserThemeInput) =>
    ownApi.post<CurrentUserTheme>(`/theme/user-theme`, new UserThemeInputDto(data)),

  setCurrentUserTheme: (data: ChangeUserThemeInput) =>
    ownApi.post<CurrentUserTheme>('/theme/set-user-theme', new ChangeUserThemeInputDto(data)),
};

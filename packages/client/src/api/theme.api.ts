import { api } from 'api';
import {
  type ChangeUserThemeInput,
  type CurrentUserTheme,
  type UserThemeInput,
  UserThemeInputDto,
  ChangeUserThemeInputDto,
} from 'models/theme.model';

export const themeApi = {
  getCurrentUserTheme: (data: UserThemeInput) =>
    api.post<CurrentUserTheme>(`/theme/user-theme`, new UserThemeInputDto(data)),

  setCurrentUserTheme: (data: ChangeUserThemeInput) =>
    api.post<CurrentUserTheme>('/theme/set-user-theme', new ChangeUserThemeInputDto(data)),
};

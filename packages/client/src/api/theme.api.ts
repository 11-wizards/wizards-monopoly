import { ownApi } from 'api';
import { type CurrentUserTheme, type UserThemeInput, UserThemeInputDto } from 'models/theme.model';

export const themeApi = {
  getCurrentUserTheme: (data: UserThemeInput) =>
    ownApi.post<CurrentUserTheme>(`/theme/user-theme`, new UserThemeInputDto(data)),

  // setCurrentUserTheme: () => ownApi.post()
};

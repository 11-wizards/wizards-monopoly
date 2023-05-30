export type SiteTheme = 'light' | 'dark';

export type UserThemeInput = {
  device?: string;
  userId: number;
};

export class UserThemeInputDto {
  device?: string;
  userId: number;

  constructor(info: UserThemeInput) {
    this.device = info.device;
    this.userId = info.userId;
  }
}

export type CurrentUserTheme = {
  device?: string;
  theme: SiteTheme;
};

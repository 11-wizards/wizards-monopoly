export type SiteTheme = 'light' | 'dark';

export type CurrentUserTheme = {
  device?: string;
  theme: SiteTheme;
};

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

export type ChangeUserThemeInput = {
  device?: string;
  theme: SiteTheme;
  userId: number;
};

export class ChangeUserThemeInputDto {
  device?: string;
  theme: SiteTheme;
  userId: number;

  constructor(info: ChangeUserThemeInput) {
    this.device = info.device;
    this.theme = info.theme;
    this.userId = info.userId;
  }
}

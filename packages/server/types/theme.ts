export type SiteTheme = 'light' | 'dark';

export type UserThemeResponse = {
  device: string;
  theme: SiteTheme;
};

export interface GetUserThemeOptions {
  userId: number;
  device?: string;
}

export interface SetUserThemeOptions {
  device?: string;
  theme: SiteTheme;
  userId: number;
}

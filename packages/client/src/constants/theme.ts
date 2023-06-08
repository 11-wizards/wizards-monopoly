import { type CurrentUserTheme, type SiteTheme } from 'models/theme.model';

export const DEFAULT_THEME: CurrentUserTheme = {
  device: 'default',
  theme: 'light',
};

export const SITE_THEMES: SiteTheme[] = ['light', 'dark'];

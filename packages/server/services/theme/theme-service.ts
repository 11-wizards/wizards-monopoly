import { UserTheme } from '../../models/UserTheme';

interface GetUserThemeOptions {
  userId: number;
  device?: string;
}

interface IThemeService {
  getUserTheme(options: GetUserThemeOptions): Promise<unknown>;
  setUserTheme(id: string, theme: string): Promise<string>;
}

class ThemeService implements IThemeService {
  async getUserTheme({ userId, device: deviceIn }: GetUserThemeOptions): Promise<unknown> {
    const userTheme = await UserTheme.findOrCreate({
      where: {
        ownerId: userId,
      },
      defaults: {
        theme: 'light',
        device: deviceIn,
      },
    });

    const { device, theme } = userTheme[0].dataValues;

    return { device, theme };
  }

  async setUserTheme(id: string, theme: string): Promise<string> {
    return Promise.resolve(`${id} ${theme}`);
  }
}

export const themeService = new ThemeService();

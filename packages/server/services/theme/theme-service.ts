import { GetUserThemeOptions, SetUserThemeOptions, UserThemeResponse } from '../../types/theme';
import { UserTheme } from '../../models/UserTheme';

interface IThemeService {
  getUserTheme(options: GetUserThemeOptions): Promise<UserThemeResponse>;
  setUserTheme(option: SetUserThemeOptions): Promise<UserThemeResponse>;
}

class ThemeService implements IThemeService {
  async getUserTheme({
    userId,
    device: deviceIn,
  }: GetUserThemeOptions): Promise<UserThemeResponse> {
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

  async setUserTheme({
    device: deviceIn,
    theme: themeIn,
    userId,
  }: SetUserThemeOptions): Promise<UserThemeResponse> {
    const updatedUserTheme = await UserTheme.update(
      {
        device: deviceIn,
        theme: themeIn,
      },
      {
        where: {
          ownerId: userId,
        },
        returning: true,
      },
    );

    const { device, theme } = updatedUserTheme[1][0].dataValues;

    return { device, theme };
  }
}

export const themeService = new ThemeService();

import { Request, Response } from 'express';
import { themeService } from '../services/theme/theme-service';

interface IUserThemeController {
  getUserTheme(req: Request, res: Response): Promise<void>;
}

class UserThemeController implements IUserThemeController {
  async getUserTheme(req: Request, res: Response): Promise<void> {
    try {
      const result = await themeService.getUserTheme(req.body);

      res.json(result);
    } catch (error) {
      console.error({ error });
      res.status(400).send(error);
    }
  }

  // async setUserTheme(): Promise<void> {}
}

export const userThemeController = new UserThemeController();

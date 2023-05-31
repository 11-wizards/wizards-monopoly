import { Router } from 'express';

import { userThemeController } from '../controllers/user-theme';

export const themeRouter = Router();

themeRouter.post('/user-theme/', userThemeController.getUserTheme);
themeRouter.post('/set-user-theme', userThemeController.setUserTheme);

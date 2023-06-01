import { ROUTER_FORUM_PATH, ROUTER_THEME_PATH } from '../constant';
import { Router } from 'express';
import { forumRouter } from './forum.router';
import { themeRouter } from './theme.router';
import { emotionsRouter } from './emotions.router';

export const router = Router();

router.use(ROUTER_FORUM_PATH, forumRouter);
router.use(ROUTER_FORUM_PATH, emotionsRouter);
router.use(ROUTER_THEME_PATH, themeRouter);

import { Router } from 'express';
import { ROUTER_FORUM_PATH } from '../constant';
import { themeRouter } from './user-theme';
import { forumRouter } from './forum-router';

export const router = Router();

router.use(ROUTER_FORUM_PATH, forumRouter);
router.use('/theme', themeRouter);

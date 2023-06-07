import { Router } from 'express';
import { themeRouter } from './user-theme';

export const router = Router();

// example
// router.use('/forum', forumRouter);
router.use('/theme', themeRouter);

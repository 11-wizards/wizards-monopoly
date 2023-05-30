import { ROUTER_FORUM_PATH } from "../constant";
import { Router as expressRouter } from 'express';
import { forumRouter } from "./forum.router";

export const router = expressRouter();

router.use(ROUTER_FORUM_PATH, forumRouter);
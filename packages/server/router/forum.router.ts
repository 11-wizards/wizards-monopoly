import { Router as expressRouter } from 'express';
import {
  AUTH_API_FORUM_PATH,
  COMMENTS_API_FORUM_PATH,
  REPLIES_API_FORUM_PATH,
  TOPICS_API_FORUM_PATH,
  TOPIC_API_FORUM_PATH,
} from '../constant';
import ForumController from '../controllers/ForumController';
import { authMiddleware } from '../services/api.auth.middleware';

export const forumRouter = expressRouter();

const {
  getTopics,
  getTopic,
  getComments,
  getRepliesComment,
  createTopic,
  createComment,
  createRepliesComment,
  errorPath,
} = ForumController;

forumRouter.all(AUTH_API_FORUM_PATH, authMiddleware);

forumRouter.get(TOPICS_API_FORUM_PATH, getTopics);

forumRouter.get(TOPIC_API_FORUM_PATH, getTopic);

forumRouter.get(COMMENTS_API_FORUM_PATH, getComments);

forumRouter.get(REPLIES_API_FORUM_PATH, getRepliesComment);

forumRouter.post(TOPICS_API_FORUM_PATH, createTopic);

forumRouter.post(COMMENTS_API_FORUM_PATH, createComment);

forumRouter.post(REPLIES_API_FORUM_PATH, createRepliesComment);

forumRouter.all('/*', errorPath);

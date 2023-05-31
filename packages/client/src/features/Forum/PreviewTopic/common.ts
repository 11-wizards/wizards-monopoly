import { ROUTES } from 'core/Router';

export const createTopicUrl = (topicId: number) => {
  const baseUrl = ROUTES.FORUM_TOPIC_PAGE.path;

  const resolveUrl = baseUrl.split(':topicId').slice(0, 1).join('');

  return `${resolveUrl}${topicId}`;
};

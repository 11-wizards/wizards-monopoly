import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: { id: 'forum.title' },
  createTopicBtn: { id: 'forum.btn.create-theme', defaultMessage: 'Create a new post' },
  responseBtn: { id: 'forum.btn.response', defaultMessage: 'user response' },
  changeTopic: { id: 'forum.topics.change', defaultMessage: 'Choose a theme' },
  topicLabel: { id: 'forum.topics.topic', defaultMessage: 'Theme:' },
  authorLabel: { id: 'forum.topics.author', defaultMessage: 'Author:' },
  responsePost: { id: 'forum.posts.response', defaultMessage: 'Reply in the theme' },
});
export const randomize = () => Math.floor(Math.random() * 100000);

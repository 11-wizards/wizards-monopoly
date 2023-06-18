import type {
  Author,
  AuthorDTO,
  Comment,
  CommentDTO,
  Reply,
  ReplyDTO,
  Topic,
  TopicDTO,
} from 'models/forum.model';
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

const authorNormalizr = (author: AuthorDTO): Author => ({
  authorId: author.author_id,
  authorName: author.name,
});

export const commentNormalizr = (comment: CommentDTO): Comment => ({
  author: authorNormalizr(comment.author),
  body: comment.body,
  commentId: comment.comment_id,
  repliesCount: comment.count_replies,
  topicId: comment.topic_id,
  date: comment.date,
});

export const topicNormalizr = (topic: TopicDTO): Topic => ({
  author: authorNormalizr(topic.author),
  body: topic.body,
  commentsCount: topic?.counts_comments,
  date: topic.date,
  title: topic.title,
  topicId: topic.topic_id,
});

export const repliesNormalizr = (replies: ReplyDTO): Reply => ({
  author: authorNormalizr(replies.author),
  body: replies.body,
  commentId: replies.comment_id,
  date: replies.date,
  replyId: replies.replies_id,
  topicId: replies.topic_id,
});

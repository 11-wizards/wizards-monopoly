export type CommentDTO = {
  author: AuthorDTO;
  body: string;
  comment_id: number;
  count_replies: number;
  date: Date;
  topic_id: number;
};

export type Comment = {
  author: Author;
  body: string;
  commentId: number;
  date: Date;
  repliesCount?: number;
  topicId: number;
};

export type AuthorDTO = {
  author_id: number;
  author_name: string;
};

export type Author = {
  authorId: number;
  authorName: string;
};

export type TopicDTO = {
  author: AuthorDTO;
  body: string;
  counts_comments: number;
  date: Date;
  title: string;
  topic_id: number;
};

export type Topic = {
  author: Author;
  body: string;
  commentsCount?: number;
  date: Date;
  title: string;
  topicId: number;
};

export type ReplyDTO = {
  author: AuthorDTO;
  body: string;
  comment_id: number;
  date: Date;
  replies_id: number;
  topic_id: number;
};

export type Reply = {
  author: Author;
  body: string;
  commentId: number;
  date: Date;
  repliesId: number;
  topicId: number;
};

export type ApiError = {
  code: number;
  msg: string;
};

export type ResponseApiSuccess<T> = {
  data: T;
  status: true;
};

export type ResponseApiError = {
  error: ApiError;
  status: false;
};

export type ResponseApi<T> = ResponseApiSuccess<T> | ResponseApiError;

export type NewTopicResponse = {
  author: AuthorDTO;
  body: string;
  title: string;
  topic_id: number;
};

export type NewCommentResponse = {
  author: AuthorDTO;
  body: string;
  topic_id: number;
};

export type NewReplyResponse = {
  author: AuthorDTO;
  body: string;
  comment_id: number;
  topic_id: number;
};

const authorNormalizr = (author: AuthorDTO): Author => ({
  authorId: author.author_id,
  authorName: author.author_name,
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
  repliesId: replies.replies_id,
  topicId: replies.topic_id,
});

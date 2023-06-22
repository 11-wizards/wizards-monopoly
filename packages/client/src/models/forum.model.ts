export type CommentDTO = {
  author: AuthorDTO;
  body: string;
  comment_id: number;
  count_replies: number;
  date: Date;
  topic_id: string;
};

export type Comment = {
  author: Author;
  body: string;
  commentId: number;
  date: Date;
  repliesCount?: number;
  topicId: string;
};

export type AuthorDTO = {
  author_id: number;
  name: string;
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
  replyId: number;
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

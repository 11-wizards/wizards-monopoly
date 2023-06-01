import { Model } from 'sequelize';
import { TypeAuthor } from './Author';

export type CreateCommentData = {
  author: TypeAuthor;
  body: string;
};

export type TypeComment = {
  topic_id: number;
  comment_id: number;
  date: Date;
  author: TypeAuthor;
  body: string;
  count_replies: number;
};

export class Comment extends Model {}

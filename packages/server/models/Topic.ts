import { Model } from 'sequelize';
import { TypeAuthor } from './Author';

export type CreateTopicData = {
  author: TypeAuthor;
  title: string;
  body: string;
};

export type TypeTopic = {
  length: any;
  topic_id: number;
  title: string;
  date: Date;
  author: TypeAuthor;
  body: string;
  count_comments: number;
};

export class Topic extends Model {}

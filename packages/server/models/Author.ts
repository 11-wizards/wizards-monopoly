import { Model } from 'sequelize';

export type TypeAuthor = {
  author_id: number;
  name: string;
};

export class Author extends Model {}

// import { DataTypes } from 'sequelize';
// import { client } from '../db';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Author, TypeAuthor } from './Author';
import { Topic } from './Topic';

export type CreateCommentData = {
  author: TypeAuthor;
  body: string;
};

export type TypeComment = {
  topic_id: number;
  comment_id: number;
  parent_comment_id: number | null;
  date: Date;
  author: TypeAuthor;
  body: string;
  // count_replies: number;
};

@Table({ timestamps: true, createdAt: 'date', updatedAt: false })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  comment_id: number;

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id: number;

  @ForeignKey(() => Author)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  author_id: number;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  parent_comment_id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  body: string;

  @BelongsTo(() => Author)
  author: Author;

  @BelongsTo(() => Topic)
  topic: Topic;
}

// export { Comment };

import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

// import { client } from '../db';

import { Author, TypeAuthor } from './Author';

export type CreateTopicData = {
  author: TypeAuthor;
  title: string;
  body: string;
};

export type TypeTopic = {
  topic_id: number;
  title: string;
  date: Date;
  body: string;
  author: TypeAuthor;
};

@Table({ timestamps: true, createdAt: 'date', updatedAt: false })
export class Topic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  topic_id: number;

  @AllowNull(false)
  @ForeignKey(() => Author)
  @Column
  author_id: number;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  @Column
  title: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  @Column
  body: string;

  @BelongsTo(() => Author)
  author: Author;
}

// const Topic1 = client.define(
//   'Topic',
//   {
//     topic_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     author_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     body: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     createdAt: 'date',
//     updatedAt: false,
//   },
// );

// Topic.belongsTo(Author, {
//   foreignKey: 'author_id',
//   as: 'author',
// });

// // export { Topic };

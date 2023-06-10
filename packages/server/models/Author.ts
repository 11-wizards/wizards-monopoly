import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';
// import { DataTypes } from 'sequelize';
// import { client } from '../db';

export type TypeAuthor = {
  author_id: number;
  name: string;
};

// const Author = client.define(
//   'Author',
//   {
//     author_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//     updatedAt: false,
//   },
// );

// export { Author };

@Table({ timestamps: false, updatedAt: false })
export class Author extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  author_id: number;

  @AllowNull(false)
  @Column
  name: string;
}

import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

// interface IUserTheme {
//   id: number;
//   theme: string;
//   device: string;
//   ownerId: string;
// }

@Table({
  paranoid: true,
  tableName: 'user-theme',
  timestamps: false,
})
export class UserTheme extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  // @ForeignKey(() => SiteTheme)
  theme: string;

  @Column(DataType.STRING)
  device: string;

  // @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId: string;
}

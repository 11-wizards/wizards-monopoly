import { Model, Table } from 'sequelize-typescript';

interface ISiteTheme {
  id: number;
}

@Table({
  paranoid: true,
  tableName: 'site-theme',
})
export class SiteTheme extends Model<ISiteTheme> {}

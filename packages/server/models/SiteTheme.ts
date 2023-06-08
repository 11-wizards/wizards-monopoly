import { Model, Table } from 'sequelize-typescript';

@Table({
  paranoid: true,
  tableName: 'site-theme',
})
export class SiteTheme extends Model {}

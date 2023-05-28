import { DataTypes } from 'sequelize';
import { client } from '../db';

const Topic = client.define('Topic', {
  topic_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
});

export { Topic };

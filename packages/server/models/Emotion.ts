import { DataTypes } from 'sequelize';
import { client } from '../db';

const Emotion = client.define('Emotion', {
  emotion: {
	  type: DataTypes.TEXT,
	  allowNull: false
    }
});

export { Emotion };

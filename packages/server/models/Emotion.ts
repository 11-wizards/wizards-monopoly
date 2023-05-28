import { DataTypes } from 'sequelize';
import { client } from '../db';

export type TMessageReaction = {
  message_id: number;
  user_id: number;
  reaction_id: number;
};

const Emotion = client.define('Emotion', {
  message_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  },
  reaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { Emotion };

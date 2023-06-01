import dotenv from 'dotenv';
import { Author } from './models/Author';
import { Comment } from './models/Comment';
import { Topic } from './models/Topic';
import { Emotion } from './models/Emotion';
import { SiteTheme } from './models/SiteTheme';
import { UserTheme } from './models/UserTheme';
import * as process from 'process';
import { DataTypes, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, DATABASE_URL, NODE_ENV } =
  process.env;

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    let connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_URL}:${POSTGRES_PORT}/${POSTGRES_DB}`;

    if (NODE_ENV === 'development') {
      connectionString = `postgres://postgres:postgres@localhost:5432/postgres`;
    }

    const client = new Sequelize(connectionString, {
      models: [SiteTheme, UserTheme],
    });

    await client.authenticate();

    const res: { now: string }[] = await client.query('SELECT NOW()', { type: QueryTypes.SELECT });

    console.log('  ➜ 🎸 Connected to the database at:', res[0].now);

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};

export async function initDBModels(sequelize: Sequelize) {
  Emotion.init(
    {
      emotion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Emotion',
    },
  );

  Topic.init(
    {
      topic_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Topic',
      timestamps: true,
      createdAt: 'date',
      updatedAt: false,
    },
  );

  Author.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Author',
      timestamps: false,
      updatedAt: false,
    },
  );

  Comment.init(
    {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parent_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      timestamps: true,
      createdAt: 'date',
      updatedAt: false,
    },
  );

  Emotion.belongsTo(Topic, {
    foreignKey: 'topic_id',
  });

  Topic.hasMany(Emotion, { foreignKey: 'topic_id' });

  Comment.belongsTo(Author, {
    foreignKey: 'author_id',
    as: 'author',
  });

  Comment.belongsTo(Topic, {
    foreignKey: 'topic_id',
    as: 'topic',
  });

  Topic.belongsTo(Author, {
    foreignKey: 'author_id',
    as: 'author',
  });

  await Emotion.sync();
}

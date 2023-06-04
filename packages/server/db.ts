import dotenv from 'dotenv';
import * as process from 'process';
import { QueryTypes } from 'sequelize';
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
      models: [__dirname + '/models'],
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

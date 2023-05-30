import * as process from 'process';
import { QueryTypes, Sequelize } from 'sequelize';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, DATABASE_URL, NODE_ENV } =
  process.env;

let connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_URL}:${POSTGRES_PORT}/${POSTGRES_DB}`;
if (NODE_ENV === 'development') {
  connectionString = `postgres://postgres:postgres@localhost:5432/postgres`;
}

export const client = new Sequelize(connectionString);


export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {

    await client.authenticate();

    const res: { now: string }[] = await client.query('SELECT NOW()', { type: QueryTypes.SELECT });

    console.log('  ➜ 🎸 Connected to the database at:', res[0].now);

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};

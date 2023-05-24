import { QueryTypes, Sequelize } from 'sequelize';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, DATABASE_URL } = process.env;

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const client = new Sequelize(
      `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_URL}:${POSTGRES_PORT}/${POSTGRES_DB}`,
    );

    await client.authenticate();

    const res: { now: string }[] = await client.query('SELECT NOW()', { type: QueryTypes.SELECT });

    console.log('  ➜ 🎸 Connected to the database at:', res[0].now);

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};

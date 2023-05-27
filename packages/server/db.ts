import * as process from 'process';
import { QueryTypes, Sequelize } from 'sequelize';

export class DBClient {
  private static client: Sequelize | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static async get(): Promise<Sequelize | null> {
    await DBClient.connect();
    return DBClient.client;
  }

  public static async connect() {
    if (DBClient.client === null) {
      DBClient.client = await DBClient.createClientAndConnect();
    }
  }

  private static async createClientAndConnect(): Promise<Sequelize | null> {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, DATABASE_URL, NODE_ENV } =
      process.env;
    try {
      let connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_URL}:${POSTGRES_PORT}/${POSTGRES_DB}`;
      if (NODE_ENV === 'development') {
        connectionString = `postgres://postgres:postgres@localhost:5432/postgres`;
      }
      const client = new Sequelize(connectionString);

      await client.authenticate();

      const res: { now: string }[] = await client.query('SELECT NOW()', {
        type: QueryTypes.SELECT,
      });

      console.log('  ➜ 🎸 Connected to the database at:', res[0].now);

      return client;
    } catch (e) {
      console.error(e);
    }

    return null;
  }
}

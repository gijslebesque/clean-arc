import { injectable } from "inversify";
import { Pool, Client } from "pg";

export const pool = new Pool({
  max: 20,
  connectionString: process.env.POSTGRESS_DB_URL,
  idleTimeoutMillis: 30000,
});

interface Query<T> {
  text: string;
  params?: T[];
}

export const sqlQuery = async <T>({ text, params }: Query<T>) => {
  const cl = await pool.connect();

  const res = cl.query(text, params);

  cl.release();
  return res;
};

export interface IPostgresDb {
  client: Client;
  provision: () => Promise<void>;
}
@injectable()
export class PostgresDB implements IPostgresDb {
  private _client() {
    return new Client({
      connectionString: process.env.POSTGRESS_DB_URL,
    });
  }

  get client() {
    return this._client();
  }

  async provision() {
    const insertTable = `CREATE TABLE IF NOT EXISTS "items" (
        "id" SERIAL,
        "display_name" VARCHAR(100) NOT NULL,
        "price" INT NOT NULL,
        PRIMARY KEY ("id")
        );`;

    try {
      const client = await this.client;

      await client.connect();

      await client.query(insertTable);

      console.log("postgres db provisioned");

      client.end();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

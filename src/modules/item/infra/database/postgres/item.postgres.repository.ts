import { injectable } from "inversify";
import { pool } from "../../../../../infra/database/postgres/postgres";
import { Item } from "../../../domain/entity/item.entity";
import { ItemRepository } from "../../../domain/repository/item.respository";

@injectable()
export class ItemPostgresRepository implements ItemRepository {
  // constructor(private _pool: typeof pool) {}

  private pool = pool.connect();
  async findAll(): Promise<Item[]> {
    const client = await pool.connect();
    const sql = "SELECT * FROM items";
    const { rows: items } = await client.query(sql);

    client.release();

    return items.map((item) =>
      Item.create({
        id: item.id,
        displayName: item.display_name,
        price: item.price,
      })
    );
  }

  async getById(id: string): Promise<Item> {
    const text = "SELECT * FROM items WHERE id = $1";

    const values = [id];

    const client = await pool.connect();

    const { rows } = await client.query(text, values);
    const insertedObject = rows[0];

    if (!rows) {
      throw new Error(id);
    }

    return Item.create({
      id: insertedObject.id,
      displayName: insertedObject.display_name,
      price: insertedObject.price,
    });
  }

  async insert(item: Item): Promise<Item> {
    const { displayName, price } = item.unmarshal();

    const client = await pool.connect();

    const text =
      "INSERT INTO items(display_name, price) VALUES($1, $2) RETURNING *";
    const values = [displayName, price];

    try {
      const res = await client.query(text, values);

      const insertedObject = res.rows[0];

      return Item.create({
        id: insertedObject.id,
        displayName: insertedObject.display_name,
        price: insertedObject.price,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

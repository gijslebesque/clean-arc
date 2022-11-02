import { injectable } from "inversify";
import { sqlQuery } from "../../../../../infra/database/postgres/postgres";
import { Item } from "../../../domain/entity/item.entity";
import { ItemRepository } from "../../../domain/repository/item.respository";

@injectable()
export class ItemPostgresRepository implements ItemRepository {
  async findAll(): Promise<Item[]> {
    const sql = "SELECT * FROM items";

    const { rows: items } = await sqlQuery({ text: sql });

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

    const params = [id];

    const { rows } = await sqlQuery({ text, params });
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

    const text =
      "INSERT INTO items(display_name, price) VALUES($1, $2) RETURNING *";

    const params = [displayName, price];

    try {
      const res = await sqlQuery({ text, params });

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

import { Item } from "../entity/item.entity";

export interface ItemRepository {
  findAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  insert(item: Item): Promise<Item>;
}

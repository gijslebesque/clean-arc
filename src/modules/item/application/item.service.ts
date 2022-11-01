import { inject, injectable } from "inversify";
import { Item } from "../domain/entity/item.entity";
import { ItemRepository } from "../domain/repository/item.respository";
import { TYPES } from "../types";

@injectable()
export class ItemService {
  constructor(
    @inject(TYPES.ItemRepository) private repository: ItemRepository
  ) {}

  public findAll(): Promise<Item[]> {
    return this.repository.findAll();
  }

  public getById(id: string): Promise<Item> {
    return this.repository.getById(id);
  }

  public create(item: Item): Promise<Item> {
    return this.repository.insert(item);
  }
}

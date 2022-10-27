import { injectable, inject } from 'inversify';
import { Item, UnmarshalledItem } from '../../../domain/entity/item.entity';
import { ItemRepository } from '../../../domain/repository/item.respository';
import { TYPES } from '../../../types';
import { ItemModel } from '../../model/item.model';
import { MemoryData } from './memory-db';

@injectable()
export class ItemMongoRepository implements ItemRepository {
  //   constructor(@inject(TYPES.Database) private _database: M) {}

  async findAll(): Promise<Item[]> {
    const items = await ItemModel.find();

    return items.map((item) => Item.create(item));
  }

  async getById(id: string): Promise<Item> {
    const item = await ItemModel.findById<UnmarshalledItem>(id);
    if (!item) {
      throw new Error(id);
    }
    return Item.create(item);
  }

  async insert(item: Item): Promise<Item> {
    const { displayName, price } = item.unmarshal();
    const inserted = await ItemModel.create({
      displayName,
      price
    });
    return Item.create(inserted);
  }
}

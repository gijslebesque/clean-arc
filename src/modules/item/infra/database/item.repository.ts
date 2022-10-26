import { injectable, inject } from 'inversify';
import { Item, UnmarshalledItem } from '../../domain/entity/item.entity';
import { ItemRepository } from '../../domain/repository/item.respository';
import { TYPES } from '../../types';
import { ItemMapper } from './mapper';
import { MemoryData } from './memory-db';

@injectable()
export class ItemMemoryRepository implements ItemRepository {
  constructor(@inject(TYPES.Database) private _database: MemoryData) {}

  async findAll(): Promise<Item[]> {
    const items = await (<Promise<UnmarshalledItem[]>>(
      this._database.items.findAll()
    ));
    return items.map((item) => ItemMapper.toDomain(item));
  }

  async getById(id: string): Promise<Item> {
    const item = await this._database.items.getById<UnmarshalledItem>(id);
    if (!item) {
      throw new Error(id);
    }
    return ItemMapper.toDomain(item);
  }

  async insert(item: Item): Promise<Item> {
    const dtoItem = item.unmarshal();
    const inserted = await this._database.items.insert(dtoItem);
    return ItemMapper.toDomain(inserted);
  }
}

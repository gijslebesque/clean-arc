import { injectable } from "inversify";
import { Item } from "../../../domain/entity/item.entity";
import { ItemRepository } from "../../../domain/repository/item.respository";
import { ItemModel, ItemSchema } from "../../model/item.model";

const mapper = (item: ItemSchema) => {
  const insertedObject: ItemSchema = item.toObject();
  return Item.create({ id: insertedObject._id, ...insertedObject });
};

@injectable()
export class ItemMongoRepository implements ItemRepository {
  async findAll(): Promise<Item[]> {
    const items = await ItemModel.find();

    return items.map(mapper);
  }

  async getById(id: string): Promise<Item> {
    const item = await ItemModel.findById(id);
    if (!item) {
      throw new Error(id);
    }
    return mapper(item);
  }

  async insert(item: Item): Promise<Item> {
    const { displayName, price } = item.unmarshal();
    const insertedDoc = await ItemModel.create({
      displayName,
      price,
    });

    return mapper(insertedDoc);
  }
}

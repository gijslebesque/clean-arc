import { injectable } from "inversify";
import { Item, UnmarshalledItem } from "../../../domain/entity/item.entity";
import { ItemRepository } from "../../../domain/repository/item.respository";
import { ItemModel } from "../../model/item.model";

@injectable()
export class ItemMongoRepository implements ItemRepository {
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
    const insertedDoc = await ItemModel.create({
      displayName,
      price,
    });

    const insertedObject = insertedDoc.toObject();

    //@ts-ignore need to fix this
    return Item.create({ id: insertedObject._id, ...insertedObject });
  }
}

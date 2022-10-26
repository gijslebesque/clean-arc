import { Item, UnmarshalledItem } from '../../domain/entity/item.entity';

export class ItemMapper {
  public static toDomain(raw: UnmarshalledItem): Item {
    return Item.create({
      id: raw.id,
      displayName: raw.displayName,
      price: raw.price
    });
  }
}

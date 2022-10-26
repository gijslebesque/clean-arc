import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { ItemService } from '../../app/item.service';
import { TYPES } from '../../types';
import { Item, UnmarshalledItem } from '../../domain/entity/item.entity';

@controller('/item')
export class ItemController {
  constructor(@inject(TYPES.ItemService) private _itemService: ItemService) {}

  @httpGet('/')
  public async listItems(): Promise<UnmarshalledItem[]> {
    const items = await this._itemService.findAll();
    return items.map((item) => item.unmarshal());
  }

  @httpGet('/:id')
  public async getItem(request: Request): Promise<UnmarshalledItem> {
    const { id } = request.params;
    const item = await this._itemService.getById(id);
    return item.unmarshal();
  }

  @httpPost('/')
  public async createItem(request: Request): Promise<UnmarshalledItem> {
    const { body } = request;
    // const input = validateCreateItem(
    //   ctx.request.body as Record<string, unknown>
    // );

    const item = Item.create(body);
    const created = await this._itemService.create(item);

    return created.unmarshal();
  }
}

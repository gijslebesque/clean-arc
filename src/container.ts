import { Container } from 'inversify';
import { ItemController } from './modules/item/infra/http/item.controller';
import { ItemService } from './modules/item/app/item.service';
import { MemoryData } from './modules/item/infra/database/memory-db';
import { ItemMemoryRepository } from './modules/item/infra/database/item.repository';
import { ItemRepository } from './modules/item/domain/repository/item.respository';
import { TYPES } from './modules/item/types';
import { IServer, Server } from './api/http/server';

const container = new Container();

container.bind(TYPES.ItemController).to(ItemController).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();

container.bind(TYPES.ItemService).to(ItemService);

// container.bind(TYPES.Logger).to(Logger).inSingletonScope();
container.bind(TYPES.Database).to(MemoryData).inSingletonScope();
// container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepository);
container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository);

export { container };

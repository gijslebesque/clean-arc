import { Container } from "inversify";
import { ItemController } from "./modules/item/infra/http/controllers/item.controller";
import { ItemService } from "./modules/item/application/item.service";
import { MemoryData } from "./infra/database/memory/memory-db";
import { ItemMemoryRepository } from "./modules/item/infra/database/memory/item.memory.repository";
import { ItemRepository } from "./modules/item/domain/repository/item.respository";
import { TYPES } from "./modules/item/types";
import { IServer, Server } from "./api/server";

const container = new Container();

container.bind(TYPES.ItemController).to(ItemController).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();

container.bind(TYPES.ItemService).to(ItemService);

// container.bind(TYPES.Logger).to(Logger).inSingletonScope();
container.bind(TYPES.Database).to(MemoryData).inSingletonScope();
// container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepository);
container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository);

export { container };

import { Container } from "inversify";
import { ItemController } from "./modules/item/infra/http/controllers/item.controller";
import { ItemService } from "./modules/item/application/item.service";
import { MemoryData } from "./infra/database/memory/memory-db";
import { ItemMemoryRepository } from "./modules/item/infra/database/memory/item.memory.repository";
import { ItemRepository } from "./modules/item/domain/repository/item.respository";
import { TYPES } from "./modules/item/types";
import { IServer, Server } from "./api/server";
import { ItemMongoRepository } from "./modules/item/infra/database/mongo/item.mongo.repository";
import { MongoDb } from "./infra/database/mongo/mongo.db";

const container = new Container();

container.bind(TYPES.ItemController).to(ItemController).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();

container.bind(TYPES.ItemService).to(ItemService);

// container.bind(TYPES.Logger).to(Logger).inSingletonScope();
container.bind(TYPES.Database).to(MemoryData).inSingletonScope();
container.bind(TYPES.MongoDb).to(MongoDb).inSingletonScope();

// container.bind()
// container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepository);

if (process.env.ENV === "in-memory") {
  container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository);
} else {
  container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMongoRepository);
}

export { container };

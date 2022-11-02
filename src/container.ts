import { Container } from "inversify";
import { ItemController } from "./modules/item/infra/http/controllers/item.controller";
import { ItemService } from "./modules/item/application/item.service";
import { MemoryData } from "./infra/database/memory/memory-db";
import { ItemMemoryRepository } from "./modules/item/infra/database/memory/item.memory.repository";
import { ItemRepository } from "./modules/item/domain/repository/item.respository";
import { TYPES } from "./modules/item/types";
import { IServer, Server } from "./api/server";
import { ItemMongoRepository } from "./modules/item/infra/database/mongo/item.mongo.repository";
import { IMongoDb, MongoDb } from "./infra/database/mongo/mongo.db";
import { ItemPostgresRepository } from "./modules/item/infra/database/postgres/item.postgres.repository";
import { IPostgresDb, PostgresDB } from "./infra/database/postgres/postgres";

const container = new Container();

container.bind(TYPES.ItemController).to(ItemController).inSingletonScope();
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();

container.bind<ItemService>(TYPES.ItemService).to(ItemService);

// container.bind(TYPES.Logger).to(Logger).inSingletonScope();
container.bind<MemoryData>(TYPES.Database).to(MemoryData).inSingletonScope();
container.bind<IMongoDb>(TYPES.MongoDb).to(MongoDb).inSingletonScope();
container.bind<IPostgresDb>(TYPES.PostgresDb).to(PostgresDB).inSingletonScope();

// container.bind()
// container.bind<CartRepository>(TYPES.CartRepository).to(CartMemoryRepository);

if (process.env.DB_ENV === "memory") {
  container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository);
} else if (process.env.DB_ENV === "mongo") {
  container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMongoRepository);
} else if (process.env.DB_ENV === "postgres") {
  container
    .bind<ItemRepository>(TYPES.ItemRepository)
    .to(ItemPostgresRepository);
}

export { container };

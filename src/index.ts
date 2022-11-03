import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { IServer } from "./api/server";
import { container } from "./di-container/container";
import { TYPES } from "./modules/item/types";
import { IMongoDb } from "./infra/database/mongo/mongo.db";
import { IPostgresDb } from "./infra/database/postgres/postgres";
import { MongoMemoryDb } from "./infra/database/mongo/mock.db";

const start = async () => {
  if (process.env.DB_ENV === "mongo") {
    await container.get<IMongoDb>(TYPES.MongoDb).connect();
  } else if (process.env.DB_ENV === "postgres") {
    await container.get<IPostgresDb>(TYPES.PostgresDb).provision();
  } else if (process.env.DB_ENV === "mongo-mock") {
    await container.get<MongoMemoryDb>(TYPES.MongoMemoryDb).connect();
  }

  const server = container.get<IServer>(TYPES.Server);
  return server.start();
};

start();

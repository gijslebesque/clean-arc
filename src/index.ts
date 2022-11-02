import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { IServer } from "./api/server";
import { container } from "./container";
import { TYPES } from "./modules/item/types";
import { IMongoDb } from "./infra/database/mongo/mongo.db";
import { IIPostgresDb } from "./infra/database/postgres/postgres";

const start = async () => {
  if (process.env.DB_ENV === "mongo") {
    await container.get<IMongoDb>(TYPES.MongoDb).connect();
  } else if (process.env.DB_ENV === "postgres") {
    await container.get<IIPostgresDb>(TYPES.PostgresDb).provision();
  }

  const server = container.get<IServer>(TYPES.Server);
  return server.start();
};

start();

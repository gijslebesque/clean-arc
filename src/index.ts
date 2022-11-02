import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { IServer } from "./api/server";
import { container } from "./container";
import { TYPES } from "./modules/item/types";
import { IMongoDb } from "./infra/database/mongo/mongo.db";

const start = async () => {
  await container.get<IMongoDb>(TYPES.MongoDb).connect();

  const server = container.get<IServer>(TYPES.Server);
  return server.start();
};

start();

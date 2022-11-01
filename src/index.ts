import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { IServer } from "./api/server";
import { container } from "./container";
import { TYPES } from "./modules/item/types";
import { DbConnection } from "./infra/database/mongo/mongo.db";

const start = async () => {
  await DbConnection.connect();
  const server = container.get<IServer>(TYPES.Server);
  return server.start();
};

start();

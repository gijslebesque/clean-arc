import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { IServer } from './api/http/server';
import { container } from './container';
import { TYPES } from './modules/item/types';

const start = async () => {
  const server = container.get<IServer>(TYPES.Server);
  return server.start();
};

start();

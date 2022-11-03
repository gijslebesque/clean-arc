import { injectable } from "inversify";
import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";
import mongoose from "mongoose";

@injectable()
export class MongoMemoryDb {
  public static mongod: MongoMemoryServer;

  public async connect() {
    MongoMemoryDb.mongod = await MongoMemoryServer.create();

    // ensures MongoMemoryServer is up
    const uri = await MongoMemoryDb.mongod.getUri();

    await mongoose.connect(uri);

    return MongoMemoryDb.mongod;
  }

  public static async stopDbMock() {
    await MongoMemoryDb.mongod.stop();
  }
}

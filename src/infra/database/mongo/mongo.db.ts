import { injectable } from "inversify";
import mongoose from "mongoose";

export interface IMongoDb {
  connect: () => Promise<void>;
  setAutoReconnect: () => void;
  disconnect: () => void;
}
@injectable()
export class MongoDb implements IMongoDb {
  public async connect() {
    const connStr = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    return mongoose
      .connect(connStr)
      .then(() => {
        console.log(`Successfully connected to ${connStr}`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  }

  public setAutoReconnect() {
    mongoose.connection.on("disconnected", () => this.connect());
  }

  public async disconnect() {
    await mongoose.connection.close();
  }
}

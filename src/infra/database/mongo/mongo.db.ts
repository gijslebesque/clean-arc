import mongoose from "mongoose";

export class DbConnection {
  public static async connect() {
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

  public static setAutoReconnect() {
    mongoose.connection.on("disconnected", () => DbConnection.connect());
  }

  public static async disconnect() {
    await mongoose.connection.close();
  }
}

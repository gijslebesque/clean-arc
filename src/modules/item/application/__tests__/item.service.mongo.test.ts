import "reflect-metadata";
import { Container } from "inversify";
import { isValidObjectId, Types } from "mongoose";
import { MongoMemoryDb } from "../../../../infra/database/mongo/mock.db";
import { Item } from "../../domain/entity/item.entity";
import { ItemRepository } from "../../domain/repository/item.respository";
import { ItemMongoRepository } from "../../infra/database/mongo/item.mongo.repository";
import { TYPES } from "../../types";
import { ItemService } from "../item.service";

const testEntity = Item.create({ displayName: "hello", price: 1 });

describe("item-service in memory mongo", () => {
  // use container for necessary dependency injections
  const container = new Container();
  container
    .bind<MongoMemoryDb>(TYPES.MongoMemoryDb)
    .to(MongoMemoryDb)
    .inSingletonScope();

  container.bind<ItemService>(TYPES.ItemService).to(ItemService);
  container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMongoRepository);

  const itemService = container.get<ItemService>(TYPES.ItemService);

  beforeAll(async () => {
    return await container.get<MongoMemoryDb>(TYPES.MongoMemoryDb).connect();
  });

  afterAll(async () => {
    return await container.get<MongoMemoryDb>(TYPES.MongoMemoryDb).stopDbMock();
  });
  let created: Item;

  test("is defined", () => {
    expect(itemService).toBeDefined();
  });

  test("creates an item", async () => {
    const res = await itemService.create(testEntity);

    created = res;

    expect({ displayName: res.displayName, price: res.price }).toEqual({
      displayName: testEntity.displayName,
      price: testEntity.price,
    });
  });

  test("finds a items", async () => {
    const res = await itemService.findAll();

    expect(res).toHaveLength(1);
  });

  test("finds an item by id", async () => {
    const res = await itemService.getById(created.id);

    expect(res).toEqual(created);
  });

  test("throws error if id is not valid object id", async () => {
    // Act
    try {
      await itemService.getById("xxx");
    } catch (err) {
      expect(err).toEqual(new Error("xxx is an invalid object id"));
    }
  });

  test("throws error if item doesn't exist", async () => {
    // Act
    const id = new Types.ObjectId().toString();
    try {
      await itemService.getById(id);
    } catch (err) {
      expect(err).toEqual(new Error(id));
    }
  });

  test("balid object", async () => {
    const testeer = "63637cf8e2607022555eb94d";

    const valid = isValidObjectId(testeer);

    expect(valid).toBe(true);
  });
});

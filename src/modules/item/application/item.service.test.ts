import "reflect-metadata";
import { Container } from "inversify";
import { ItemRepository } from "../domain/repository/item.respository";
import { ItemMemoryRepository } from "../infra/database/memory/item.memory.repository";
import { TYPES } from "../types";
import { ItemService } from "./item.service";
import { MemoryData } from "../../../infra/database/memory/memory-db";
import { Item } from "../domain/entity/item.entity";

const testEntity = Item.create({ displayName: "hello", price: 1 });

describe("item-service", () => {
  // use container for necessary dependency injections
  const container = new Container();
  container.bind(TYPES.Database).to(MemoryData).inSingletonScope();
  container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository);
  container.bind<ItemService>(TYPES.ItemService).to(ItemService);
  const itemService = container.get<ItemService>(TYPES.ItemService);

  test("is defined", () => {
    expect(itemService).toBeDefined();
  });

  test("creates an item", async () => {
    // Arrange

    // Act
    const newItem = await itemService.create(testEntity);

    // Assert
    expect(testEntity).toEqual(newItem);
  });

  test("finds a items", async () => {
    // Act

    const res = await itemService.findAll();

    // Assert
    expect(res).toEqual([testEntity]);
  });

  test("finds an item by id", async () => {
    // Act

    const res = await itemService.getById(testEntity.id);

    // Assert
    expect(res).toEqual(testEntity);
  });

  test("throws error if item doesn't exist", async () => {
    // Act
    try {
      await itemService.getById("xxx");
    } catch (err) {
      expect(err).toEqual(new Error("xxx"));
    }
  });
});

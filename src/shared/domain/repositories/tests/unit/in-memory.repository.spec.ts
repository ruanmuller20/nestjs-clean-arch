import { Entity } from "@/shared/domain/entities/entity";
import { InMemoryRepository } from "@/shared/domain/repositories/in-memory.repository";
import { NotFoundError } from "@/shared/domain/errors/not-found-error";

type StubEntityProps = {
  name: string;
  price: number;

}

class StubEntity extends Entity<StubEntityProps> {

}


class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe("InMemoryRepository unit tests", () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())

  })

  it("should throw error when entity not found", async () => {

    await expect(sut.findById('fakeId')).rejects.toThrow(
       new NotFoundError('Entity not found'),
    )

  });

  it("should find a entity by id", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);
    const result =  await sut.findById(entity._id)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())

  })

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "test name", price: 50 });
    await sut.insert(entity);
    const result =  await sut.findAll()
    expect([entity]).toStrictEqual(result)

  })

})

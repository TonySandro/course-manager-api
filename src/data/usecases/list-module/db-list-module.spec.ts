import { DbListModule } from "./db-list-module";
import { ModuleModel } from "../../../domain/models/module";
import { ListModuleRepository } from "./../../protocols/database/list-module-repository";
import { CourseModel } from "../../../domain/models/course";

const makeListModuleRepository = (): ListModuleRepository => {
  class ListModuleRepositoryStub implements ListModuleRepository {
    list(): Promise<ModuleModel[]> {
      return new Promise((resolve) => resolve([makeFakeModule()]));
    }
  }

  return new ListModuleRepositoryStub();
};

const makeFakeCourse = (): CourseModel => ({
  id: "valid_id",
  title: "Advanced JavaScript Course",
  description: "Learn advanced concepts of JavaScript...",
  price: 49.99,
  imageUrl: "https://example.com/images/advanced-javascript-course.jpg",
  createdAt: new Date("2025-01-03"),
  updatedAt: new Date("2025-01-03"),
});

const makeFakeModule = (): ModuleModel => ({
  id: "valid_id",
  title: "Class Declaration",
  description:
    "In this module, we will be concentrating on JavaScript classes.",
  orderNumber: 1,
  course: makeFakeCourse(),
  createdAt: new Date("2025-01-03"),
  updatedAt: new Date("2025-01-03"),
});

interface SutTypes {
  sut: DbListModule;
  listModuleRepositoryStub: ListModuleRepository;
}
const makeSut = (): SutTypes => {
  const listModuleRepositoryStub = makeListModuleRepository();
  const sut = new DbListModule(listModuleRepositoryStub);

  return {
    sut,
    listModuleRepositoryStub,
  };
};
describe("DB List Module Usecase", () => {
  test("Should call ListModuleRepository with correct values", async () => {
    const { sut, listModuleRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listModuleRepositoryStub, "list");

    await sut.list("valid_id");
    expect(listSpy).toHaveBeenCalledWith("valid_id");
  });

  test("Should throw listModuleRepository with correct throws", async () => {
    const { sut, listModuleRepositoryStub } = makeSut();
    jest
      .spyOn(listModuleRepositoryStub, "list")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.list("valid_id");
    await expect(promise).rejects.toThrow();
  });
});

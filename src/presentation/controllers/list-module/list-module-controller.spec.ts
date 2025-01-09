import { ListModuleController } from "./list-module-controller";
import { ModuleModel } from "../../../domain/models/module";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import { MissingParamError, ServerError } from "../../errors";
import { ListModule } from "../../../domain/usecases/list-module";
import { CourseModel } from "../../../domain/models/course";

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

const makeListModule = (): ListModule => {
  class ListModuleStub implements ListModule {
    async list(): Promise<ModuleModel[]> {
      const FakeModule = makeFakeModule();
      return new Promise((resolve) => resolve([FakeModule]));
    }
  }

  return new ListModuleStub();
};

interface SutTypes {
  sut: ListModuleController;
  listModuleStub: ListModule;
}

const makeSut = (): SutTypes => {
  const listModuleStub = makeListModule();
  const sut = new ListModuleController(listModuleStub);

  return {
    sut,
    listModuleStub,
  };
};

describe("List Module Controller", () => {
  test("Should return 400 if no courseId is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        courseId: null,
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.body).toEqual(new MissingParamError("courseId"));
  });

  test("Should return 500 if ListModule throws", async () => {
    const { sut, listModuleStub } = makeSut();
    jest.spyOn(listModuleStub, "list").mockImplementationOnce(async () => {
      throw new Error();
    });
    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(serverError(new ServerError("")));
  });

  test("Should call ListModule with correct value", async () => {
    const { sut, listModuleStub } = makeSut();
    const listModuleSpy = jest.spyOn(listModuleStub, "list");
    const httpRequest = {
      body: {
        courseId: makeFakeCourse().id,
      },
    };
    await sut.handle(httpRequest);

    expect(listModuleSpy).toHaveBeenCalledWith(httpRequest.body.courseId);
  });

  test("Should return 200 on success", async () => {
    const { sut, listModuleStub } = makeSut();
    jest
      .spyOn(listModuleStub, "list")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve([makeFakeModule()]))
      );

    const httpRequest = {
      body: {
        courseId: makeFakeCourse().id,
      },
    };

    const response = await sut.handle(httpRequest);
    expect(response).toEqual(success([makeFakeModule()]));
  });
});

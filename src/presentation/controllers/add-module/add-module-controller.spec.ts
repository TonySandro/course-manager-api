import { ModuleModel } from "./../../../domain/models/module";
import { AddModuleController } from "./add-module-controller";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import { HttpRequest, Validation } from "../../protocols";
import { MissingParamError, ServerError } from "../../errors";
import { AddModule, AddModuleModel } from "../../../domain/usecases/add-module";
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

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: "Class Declaration",
    description:
      "In this module, we will be concentrating on JavaScript classes.",
    orderNumber: 1,
  },
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

const makeAddModule = (): AddModule => {
  class AddModuleStub implements AddModule {
    async add(module: AddModuleModel): Promise<ModuleModel> {
      const FakeModule = makeFakeModule();
      return new Promise((resolve) => resolve(FakeModule));
    }
  }

  return new AddModuleStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null as unknown as Error;
    }
  }

  return new ValidationStub();
};

interface SutTypes {
  sut: AddModuleController;
  validationStub: Validation;
  addModuleStub: AddModule;
}

const makeSut = (): SutTypes => {
  const addModuleStub = makeAddModule();
  const validationStub = makeValidation();
  const sut = new AddModuleController(addModuleStub, validationStub);

  return {
    sut,
    validationStub,
    addModuleStub,
  };
};

describe("Add Module Controller", () => {
  test("Should call AddModule with correct values", async () => {
    const { sut, addModuleStub } = makeSut();
    const addSpy = jest.spyOn(addModuleStub, "add");

    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      title: "Class Declaration",
      description:
        "In this module, we will be concentrating on JavaScript classes.",
      orderNumber: 1,
    });
  });

  test("Should return 500 if AddModule throws", async () => {
    const { sut, addModuleStub } = makeSut();
    jest.spyOn(addModuleStub, "add").mockImplementationOnce(async () => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError("")));
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(success(makeFakeModule()));
  });
});

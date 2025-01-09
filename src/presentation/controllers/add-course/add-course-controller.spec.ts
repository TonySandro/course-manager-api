import { CourseModel } from "./../../../domain/models/course";
import { AddCourseController } from "./add-course-controller";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import { HttpRequest, Validation } from "../../protocols";
import { MissingParamError, ServerError } from "../../errors";
import { AddCourse, AddCourseModel } from "../../../domain/usecases/add-course";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: "Advanced JavaScript Course",
    description: "Learn advanced concepts of JavaScript...",
    price: 49.99,
    imageUrl: "https://example.com/images/advanced-javascript-course.jpg",
  },
});

const makeFakeCourse = (): CourseModel => ({
  id: "valid_id",
  title: "Advanced JavaScript Course",
  description: "Learn advanced concepts of JavaScript...",
  price: 49.99,
  imageUrl: "https://example.com/images/advanced-javascript-course.jpg",
  createdAt: new Date("2025-01-03"),
  updatedAt: new Date("2025-01-03"),
});

const makeAddCourse = (): AddCourse => {
  class AddCourseStub implements AddCourse {
    async add(course: AddCourseModel): Promise<CourseModel> {
      const FakeCourse = makeFakeCourse();
      return new Promise((resolve) => resolve(FakeCourse));
    }
  }

  return new AddCourseStub();
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
  sut: AddCourseController;
  validationStub: Validation;
  addCourseStub: AddCourse;
}

const makeSut = (): SutTypes => {
  const addCourseStub = makeAddCourse();
  const validationStub = makeValidation();
  const sut = new AddCourseController(validationStub, addCourseStub);

  return {
    sut,
    validationStub,
    addCourseStub,
  };
};

describe("Add Course Controller", () => {
  test("Should call AddCourse with correct values", async () => {
    const { sut, addCourseStub } = makeSut();
    const addSpy = jest.spyOn(addCourseStub, "add");

    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      title: "Advanced JavaScript Course",
      description: "Learn advanced concepts of JavaScript...",
      price: 49.99,
      imageUrl: "https://example.com/images/advanced-javascript-course.jpg",
    });
  });

  test("Should return 500 if AddCourse throws", async () => {
    const { sut, addCourseStub } = makeSut();
    jest.spyOn(addCourseStub, "add").mockImplementationOnce(async () => {
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

    expect(httpResponse).toEqual(success({}));
  });
});

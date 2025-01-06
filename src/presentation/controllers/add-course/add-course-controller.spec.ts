import { AddCourseController } from "./add-course-controller";
import { badRequest, success } from "../../helpers/http/http-helper";
import { HttpRequest, Validation } from "../../protocols";
import { MissingParamError } from "../../errors";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: "Advanced JavaScript Course",
    description: "Learn advanced concepts of JavaScript...",
    price: 49.99,
    image_url: "https://example.com/images/advanced-javascript-course.jpg",
    created_at: new Date("2023-01-01T10:00:00Z"),
    updated_at: new Date("2023-01-10T12:00:00Z"),
  },
});

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
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const sut = new AddCourseController(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe("Add Course Controller", () => {
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

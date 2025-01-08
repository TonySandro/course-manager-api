import { ListCourseController } from "./list-course-controller";
import { CourseModel } from "./../../../domain/models/course";
import { serverError, success } from "../../helpers/http/http-helper";
import { Validation } from "../../protocols";
import { ServerError } from "../../errors";
import { ListCourse } from "../../../domain/usecases/list-course";

const makeFakeCourse = (): CourseModel => ({
  id: "valid_id",
  title: "Advanced JavaScript Course",
  description: "Learn advanced concepts of JavaScript...",
  price: 49.99,
  imageUrl: "https://example.com/images/advanced-javascript-course.jpg",
  createdAt: new Date("2025-01-03"),
  updatedAt: new Date("2025-01-03"),
});

const makeListCourse = (): ListCourse => {
  class ListCourseStub implements ListCourse {
    async list(courseId: string): Promise<CourseModel[]> {
      const FakeCourse = makeFakeCourse();
      return new Promise((resolve) => resolve([FakeCourse]));
    }
  }

  return new ListCourseStub();
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
  sut: ListCourseController;
  validationStub: Validation;
  listCourseStub: ListCourse;
}

const makeSut = (): SutTypes => {
  const listCourseStub = makeListCourse();
  const validationStub = makeValidation();
  const sut = new ListCourseController(listCourseStub);

  return {
    sut,
    validationStub,
    listCourseStub,
  };
};

describe("List Course Controller", () => {
  test("Should return 500 if ListAccount throws", async () => {
    const { sut, listCourseStub } = makeSut();
    jest.spyOn(listCourseStub, "list").mockImplementationOnce(async () => {
      throw new Error();
    });
    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(serverError(new ServerError("")));
  });
});

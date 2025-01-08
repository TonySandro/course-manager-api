import { ListCourseController } from "./list-course-controller";
import { CourseModel } from "./../../../domain/models/course";
import { serverError, success } from "../../helpers/http/http-helper";
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
    async list(): Promise<CourseModel[]> {
      const FakeCourse = makeFakeCourse();
      return new Promise((resolve) => resolve([FakeCourse]));
    }
  }

  return new ListCourseStub();
};

interface SutTypes {
  sut: ListCourseController;
  listCourseStub: ListCourse;
}

const makeSut = (): SutTypes => {
  const listCourseStub = makeListCourse();
  const sut = new ListCourseController(listCourseStub);

  return {
    sut,
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

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle({});
    expect(response).toEqual(success([makeFakeCourse()]));
  });
});

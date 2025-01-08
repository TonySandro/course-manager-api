import { DbListCourse } from "./db-list-course";
import { CourseModel } from "../../../domain/models/course";
import { ListCourseRepository } from "./../../protocols/database/list-course-repository";

const makeListCourseRepository = (): ListCourseRepository => {
  class ListCourseRepositoryStub implements ListCourseRepository {
    list(): Promise<CourseModel[]> {
      return new Promise((resolve) => resolve([makeFakeCourse()]));
    }
  }

  return new ListCourseRepositoryStub();
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

const makeFakeCourseData = () => ({
  title: "Advanced JavaScript Course",
  description: "Learn advanced concepts of JavaScript...",
  price: 49.99,
});

interface SutTypes {
  sut: DbListCourse;
  listCourseRepositoryStub: ListCourseRepository;
}
const makeSut = (): SutTypes => {
  const listCourseRepositoryStub = makeListCourseRepository();
  const sut = new DbListCourse(listCourseRepositoryStub);

  return {
    sut,
    listCourseRepositoryStub,
  };
};
describe("DB List Course Usecase", () => {
  test("Should call ListCourseRepository with correct values", async () => {
    const { sut, listCourseRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listCourseRepositoryStub, "list");

    await sut.list();
    expect(listSpy).toHaveBeenCalledWith();
  });

  test("Should throw listCourseRepository with correct throws", async () => {
    const { sut, listCourseRepositoryStub } = makeSut();
    jest
      .spyOn(listCourseRepositoryStub, "list")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });
});

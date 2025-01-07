import { DbAddCourse } from "./db-add-course";
import { CourseModel } from "../../../domain/models/course";
import { AddCourseModel } from "../../../domain/usecases/add-course";
import { AddCourseRepository } from "./../../protocols/database/add-course-repository";

const makeAddCourseRepository = (): AddCourseRepository => {
  class AddCourseRepositoryStub implements AddCourseRepository {
    async add(course: AddCourseModel): Promise<CourseModel> {
      return new Promise((resolve) => resolve(makeFakeCourse()));
    }
  }
  return new AddCourseRepositoryStub();
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

const makeFakeCourseData = (): AddCourseModel => ({
  title: "Advanced JavaScript Course",
  description: "Learn advanced concepts of JavaScript...",
  price: 49.99,
});

interface SutTypes {
  sut: DbAddCourse;
  addCourseRepositoryStub: AddCourseRepository;
}
const makeSut = (): SutTypes => {
  const addCourseRepositoryStub = makeAddCourseRepository();
  const sut = new DbAddCourse(addCourseRepositoryStub);

  return {
    sut,
    addCourseRepositoryStub,
  };
};
describe("DB Add Course Usecase", () => {
  test("Should call AddCourseRepository with correct values", async () => {
    const { sut, addCourseRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addCourseRepositoryStub, "add");

    await sut.add(makeFakeCourseData());
    expect(addSpy).toHaveBeenCalledWith({
      title: "Advanced JavaScript Course",
      description: "Learn advanced concepts of JavaScript...",
      price: 49.99,
    });
  });

  test("Should throw addCourseRepository with correct throws", async () => {
    const { sut, addCourseRepositoryStub } = makeSut();
    jest
      .spyOn(addCourseRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFakeCourseData());
    await expect(promise).rejects.toThrow();
  });

  test("Should return an course on success", async () => {
    const { sut } = makeSut();

    const course = await sut.add(makeFakeCourseData());
    expect(course).toEqual(makeFakeCourse());
  });
});

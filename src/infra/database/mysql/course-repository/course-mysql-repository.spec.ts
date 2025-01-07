import { CourseMysqlRepository } from "./course-mysql-repository";
import { MysqlHelper } from "../helper/mysql-helper";

const makeSut = () => {
  return new CourseMysqlRepository();
};

describe("Course Mysql repository", () => {
  beforeAll(async () => {
    await MysqlHelper.connect();
  });

  afterAll(async () => {
    await MysqlHelper.disconnect();
  });

  afterEach(async () => {
    await MysqlHelper.deleteCourseByTitle("Advanced JavaScript Course");
  });

  test("Should return course if success", async () => {
    const sut = makeSut();

    const course = await sut.add({
      title: "Advanced JavaScript Course",
      description: "Learn advanced concepts of JavaScript...",
      price: 49.99,
      imageUrl: "https://example.com/images/javascript-course.jpg",
    });

    expect(course).toBeTruthy();
    expect(course.title).toBe("Advanced JavaScript Course");
    expect(course.description).toBe("Learn advanced concepts of JavaScript...");
    expect(course.price).toBe(49.99);
    expect(course.imageUrl).toBe(
      "https://example.com/images/javascript-course.jpg"
    );
  });
});

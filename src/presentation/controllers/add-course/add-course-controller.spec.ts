import { AddCourseController } from "./add-course-controller";
import { success } from "../../helpers/http/http-helper";

const makeSut = () => {
  return new AddCourseController();
};

describe("Add Course Controller", () => {
  test("Should return 200 if valid data is provided", async () => {
    const sut = makeSut();
    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(success({}));
  });
});

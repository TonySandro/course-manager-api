import { ListCourse } from "../../../domain/usecases/list-course";
import { serverError, success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListCourseController implements Controller {
  constructor(private readonly listCourse: ListCourse) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const courses = await this.listCourse.list();

      return success(courses);
    } catch (error) {
      return serverError(error);
    }
  }
}

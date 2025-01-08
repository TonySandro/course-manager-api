import { ListCourse } from "../../../domain/usecases/list-course";
import { serverError, success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListCourseController implements Controller {
  constructor(private readonly listCourse: ListCourse) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return success(await this.listCourse.list());
    } catch (error) {
      return serverError(error);
    }
  }
}

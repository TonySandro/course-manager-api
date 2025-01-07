import { AddCourse } from "../../../domain/usecases/add-course";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from "../../protocols";

export class AddCourseController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCourse: AddCourse
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      await this.addCourse.add(httpRequest.body);

      return success({});
    } catch (error) {
      return serverError(error);
    }
  }
}

import { success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class AddCourseController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return success({});
  }
}

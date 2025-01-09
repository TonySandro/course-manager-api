import { ListModule } from "../../../domain/usecases/list-module";
import { MissingParamError } from "../../errors";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListModuleController implements Controller {
  constructor(private readonly listModule: ListModule) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { courseId } = httpRequest.body;
      if (!courseId) {
        return badRequest(new MissingParamError("courseId"));
      }

      const modules = await this.listModule.list(courseId);
      return success(modules);
    } catch (error) {
      return serverError(error);
    }
  }
}

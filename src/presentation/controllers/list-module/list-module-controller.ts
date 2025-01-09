import { ListModule } from "../../../domain/usecases/list-module";
import { serverError, success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListModuleController implements Controller {
  constructor(private readonly listModule: ListModule) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const modules = await this.listModule.list(httpRequest.body.courseId);
      return success(modules);
    } catch (error) {
      return serverError(error);
    }
  }
}

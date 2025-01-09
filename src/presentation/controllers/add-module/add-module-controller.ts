import { AddModule } from "../../../domain/usecases/add-module";
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

export class AddModuleController implements Controller {
  constructor(
    private readonly addModule: AddModule,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const module = await this.addModule.add(httpRequest.body);

      return success(module);
    } catch (error) {
      return serverError(error);
    }
  }
}

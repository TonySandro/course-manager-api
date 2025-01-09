import { ModuleModel } from "../../../domain/models/module";
import { ListModule } from "../../../domain/usecases/list-module";
import { ListModuleRepository } from "../../protocols/database/list-module-repository";

export class DbListModule implements ListModule {
  constructor(private readonly listModuleRepository: ListModuleRepository) {}

  async list(courseId: string): Promise<ModuleModel[]> {
    return await this.listModuleRepository.list(courseId);
  }
}

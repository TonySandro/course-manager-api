import { ModuleModel } from "../../../domain/models/module";
import { AddModule, AddModuleModel } from "../../../domain/usecases/add-module";
import { AddModuleRepository } from "../../protocols/database/add-module-repository";

export class DbAddModule implements AddModule {
  constructor(private readonly addModuleRepository: AddModuleRepository) {}
  async add(module: AddModuleModel): Promise<ModuleModel> {
    return await this.addModuleRepository.add(module);
  }
}

import { ModuleModel } from "../../../domain/models/module";
import { AddModuleModel } from "../../../domain/usecases/add-module";

export interface AddModuleRepository {
  add(module: AddModuleModel): Promise<ModuleModel>;
}

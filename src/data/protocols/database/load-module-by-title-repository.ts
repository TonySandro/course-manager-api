import { ModuleModel } from "../../../domain/models/module";

export interface LoadModuleByTitleRepository {
  loadByTitle(title: string): Promise<ModuleModel>;
}

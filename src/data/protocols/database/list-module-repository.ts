import { ModuleModel } from "../../../domain/models/module";

export interface ListModuleRepository {
  list(courseId: string): Promise<ModuleModel[]>;
}

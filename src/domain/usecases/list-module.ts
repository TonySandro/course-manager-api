import { ModuleModel } from "../models/module";

export interface ListModule {
  list(courseId: string): Promise<ModuleModel[]>;
}

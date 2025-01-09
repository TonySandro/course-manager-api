import { ModuleModel } from "../models/module";

export interface AddModuleModel {
  title: string;
  description: string;
  orderNumber: number;
}

export interface AddModule {
  add(module: AddModuleModel): Promise<ModuleModel>;
}

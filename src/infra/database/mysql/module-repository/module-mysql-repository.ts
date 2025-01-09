import { AddModuleRepository } from "../../../../data/protocols/database/add-module-repository";
import { LoadModuleByTitleRepository } from "../../../../data/protocols/database/load-module-by-title-repository";
import { ModuleModel } from "../../../../domain/models/module";
import { AddModuleModel } from "../../../../domain/usecases/add-module";
import { AppDataSource } from "../../../../main/config/typeorm.config";
import { MysqlHelper } from "../helper/mysql-helper";

export class ModuleMysqlRepository
  implements AddModuleRepository, LoadModuleByTitleRepository
{
  async add(module: AddModuleModel): Promise<ModuleModel> {
    const moduleRepository = AppDataSource.getRepository(ModuleModel);

    const newModule = moduleRepository.create(module);

    return await moduleRepository.save(newModule);
  }

  async loadByTitle(title: string): Promise<ModuleModel> {
    const moduleCollection = await MysqlHelper.getRepository(ModuleModel);
    const module = await moduleCollection.findOne({ where: { title } });
    return module;
  }
}

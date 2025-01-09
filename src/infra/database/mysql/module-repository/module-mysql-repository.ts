import { AddModuleRepository } from "../../../../data/protocols/database/add-module-repository";
import { ListModuleRepository } from "../../../../data/protocols/database/list-module-repository";
import { LoadModuleByTitleRepository } from "../../../../data/protocols/database/load-module-by-title-repository";
import { CourseModel } from "../../../../domain/models/course";
import { ModuleModel } from "../../../../domain/models/module";
import { AddModuleModel } from "../../../../domain/usecases/add-module";
import { AppDataSource } from "../../../../main/config/typeorm.config";
import { MysqlHelper } from "../helper/mysql-helper";

export class ModuleMysqlRepository
  implements
    AddModuleRepository,
    LoadModuleByTitleRepository,
    ListModuleRepository
{
  async add(module: AddModuleModel): Promise<ModuleModel> {
    const moduleRepository = AppDataSource.getRepository(ModuleModel);

    const newModule = moduleRepository.create(module);

    return await moduleRepository.save(newModule);
  }

  async list(courseId: string): Promise<ModuleModel[]> {
    const repository = await MysqlHelper.getRepository(CourseModel);
    const course = await repository.findOne({
      where: { id: courseId },
      relations: ["modules"],
    });

    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    return course.modules;
  }

  async loadByTitle(title: string): Promise<ModuleModel> {
    const moduleCollection = await MysqlHelper.getRepository(ModuleModel);
    const module = await moduleCollection.findOne({ where: { title } });
    return module;
  }
}

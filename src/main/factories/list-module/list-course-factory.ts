import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller";
import { LogMysqlRepository } from "../../../infra/database/mysql/log/log-mysql-repository";
import { ModuleMysqlRepository } from "../../../infra/database/mysql/module-repository/module-mysql-repository";
import { ListModuleController } from "../../../presentation/controllers/list-module/list-module-controller";
import { DbListModule } from "../../../data/usecases/list-module/db-list-module";

export const makeListModuleController = (): Controller => {
  const listModuleRepository = new ModuleMysqlRepository();
  const listModule = new DbListModule(listModuleRepository);
  const listModuleController = new ListModuleController(listModule);
  const logMysqlRepository = new LogMysqlRepository();

  return new LogControllerDecorator(listModuleController, logMysqlRepository);
};

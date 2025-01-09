import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller";
import { LogMysqlRepository } from "../../../infra/database/mysql/log/log-mysql-repository";
import { AddModuleController } from "../../../presentation/controllers/add-module/add-module-controller";
import { ModuleMysqlRepository } from "../../../infra/database/mysql/module-repository/module-mysql-repository";
import { DbAddModule } from "../../../data/usecases/add-module/db-add-module";
import { makeAddModuleValidation } from "./add-module-validation-factory";

export const makeAddModuleController = (): Controller => {
  const addModuleRepository = new ModuleMysqlRepository();
  const addModule = new DbAddModule(addModuleRepository);
  const addModuleController = new AddModuleController(
    addModule,
    makeAddModuleValidation()
  );
  const logMysqlRepository = new LogMysqlRepository();

  return new LogControllerDecorator(addModuleController, logMysqlRepository);
};

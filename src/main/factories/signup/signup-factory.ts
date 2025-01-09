import { SignUpController } from "../../../presentation/controllers/signup/signup";
import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller";
import { makeSignUpValidation } from "./signup-validation-factory";
import { BcryptAdapter } from "../login/login-factory-protocols";
import { AccountMysqlRepository } from "../../../infra/database/mysql/account-repository/account-mysql-repository";
import { LogMysqlRepository } from "../../../infra/database/mysql/log/log-mysql-repository";

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountMysqlRepository();
  const bcryptAdapter = new BcryptAdapter(12);
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
  const signUpController = new SignUpController(
    addAccount,
    makeSignUpValidation()
  );
  const logMysqlRepository = new LogMysqlRepository();

  return new LogControllerDecorator(signUpController, logMysqlRepository);
};

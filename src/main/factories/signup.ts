import { SignUpController } from "../../presentation/controllers/signup/signup";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account-mongo-repository";
import { Controller } from "../../presentation/protocols";
import { LogControllerDecorator } from "../decorators/log-controller";
import { LogMongoRepository } from "../../infra/db/mongodb/log-repository/log-mongo-repository";
import { makeSignUpValidation } from "./signup-validation";
import { BcryptAdapter } from "./login/login-factory-protocols";

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(12);
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
  const signUpController = new SignUpController(
    addAccount,
    makeSignUpValidation()
  );
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logMongoRepository);
};

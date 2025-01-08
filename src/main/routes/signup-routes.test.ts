import request from "supertest";
import app from "../config/app";
import { MysqlHelper } from "../../infra/database/mysql/helper/mysql-helper";
import { hash } from "bcrypt";
import { AccountModel } from "../../domain/models/account";

describe("Sign Up Routes Middleware", () => {
  beforeAll(async () => {
    await MysqlHelper.connect();
  });

  afterAll(async () => {
    await MysqlHelper.disconnect();
  });

  afterEach(async () => {
    await MysqlHelper.deleteEntityByField(
      "accounts",
      "email",
      "tonysduarte@gmail.com"
    );
  });

  describe("POST /signup", () => {
    test("Should return an account on success", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "Tony",
          email: "tonysduarte@gmail.com",
          password: "112233",
          passwordConfirmation: "112233",
        })
        .expect(200);
    });
  });

  describe("POST /login", () => {
    test("Should return 200 on login", async () => {
      const password = await hash("123", 12);
      const accountRepository = await MysqlHelper.getRepository(AccountModel);
      await accountRepository.save({
        name: "Tony",
        email: "tonysduarte@gmail.com",
        password,
      });

      await request(app)
        .post("/api/login")
        .send({
          email: "tonysduarte@gmail.com",
          password: "123",
        })
        .expect(200);
    });
  });
});

import { ModuleMysqlRepository } from "./module-mysql-repository";
import { MysqlHelper } from "../helper/mysql-helper";

const makeModule = () => ({
  title: "Class Declaration",
  description: "In this module, we will be concentrating on JavaScript classes",
  orderNumber: 1,
});

const makeSut = () => {
  return new ModuleMysqlRepository();
};

describe("Module Mysql repository", () => {
  beforeAll(async () => {
    await MysqlHelper.connect();
  });

  afterAll(async () => {
    await MysqlHelper.disconnect();
  });

  afterEach(async () => {
    await MysqlHelper.deleteEntityByField(
      "modules",
      "title",
      "Class Declaration"
    );
  });

  test("Should return course if success", async () => {
    const sut = makeSut();

    const course = await sut.add(makeModule());

    expect(course).toBeTruthy();
    expect(course.title).toBe("Class Declaration");
    expect(course.description).toBe(
      "In this module, we will be concentrating on JavaScript classes"
    );
    expect(course.orderNumber).toBe(1);
  });
});

import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller";
import { LogMysqlRepository } from "../../../infra/database/mysql/log/log-mysql-repository";
import { AddCourseController } from "../../../presentation/controllers/add-course/add-course-controller";
import { CourseMysqlRepository } from "../../../infra/database/mysql/course-repository/course-mysql-repository";
import { DbAddCourse } from "../../../data/usecases/add-course/db-add-course";
import { makeAddCourseValidation } from "./add-course-validation-factory";

export const makeAddCourseController = (): Controller => {
  const addCourseRepository = new CourseMysqlRepository();
  const addCourse = new DbAddCourse(addCourseRepository);
  const signUpController = new AddCourseController(
    makeAddCourseValidation(),
    addCourse
  );
  const logMysqlRepository = new LogMysqlRepository();

  return new LogControllerDecorator(signUpController, logMysqlRepository);
};

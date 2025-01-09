import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/log-controller";
import { LogMysqlRepository } from "../../../infra/database/mysql/log/log-mysql-repository";
import { CourseMysqlRepository } from "../../../infra/database/mysql/course-repository/course-mysql-repository";
import { ListCourseController } from "../../../presentation/controllers/list-course/list-course-controller";
import { DbListCourse } from "../../../data/usecases/list-course/db-list-course";

export const makeListCourseController = (): Controller => {
  const listCourseRepository = new CourseMysqlRepository();
  const listCourse = new DbListCourse(listCourseRepository);
  const listCourseController = new ListCourseController(listCourse);
  const logMysqlRepository = new LogMysqlRepository();

  return new LogControllerDecorator(listCourseController, logMysqlRepository);
};

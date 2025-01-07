import { AddCourseRepository } from "../../../../data/protocols/database/add-course-repository";
import { LoadCourseByTitleRepository } from "../../../../data/protocols/database/load-course-by-title-repository";
import { CourseModel } from "../../../../domain/models/course";
import { AddCourseModel } from "../../../../domain/usecases/add-course";
import { AppDataSource } from "../../../../main/config/typeorm.config";
import { MysqlHelper } from "../helper/mysql-helper";

export class CourseMysqlRepository
  implements AddCourseRepository, LoadCourseByTitleRepository
{
  async add(course: AddCourseModel): Promise<CourseModel> {
    const courseRepository = AppDataSource.getRepository(CourseModel);

    const newCourse = courseRepository.create(course);

    return await courseRepository.save(newCourse);
  }

  async loadByTitle(title: string): Promise<CourseModel> {
    const courseCollection = await MysqlHelper.getRepository(CourseModel);
    const course = await courseCollection.findOne({ where: { title } });
    return course;
  }
}

import { AddCourseRepository } from "../../../../data/protocols/database/add-course-repository";
import { CourseModel } from "../../../../domain/models/course";
import { AddCourseModel } from "../../../../domain/usecases/add-course";
import { AppDataSource } from "../../../../main/config/typeorm.config";

export class CourseMysqlRepository implements AddCourseRepository {
  async add(course: AddCourseModel): Promise<CourseModel> {
    const courseRepository = AppDataSource.getRepository(CourseModel);

    const newCourse = courseRepository.create(course);

    return await courseRepository.save(newCourse);
  }
}

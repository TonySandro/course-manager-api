import { CourseModel } from "../../../domain/models/course";
import { AddCourse, AddCourseModel } from "../../../domain/usecases/add-course";
import { AddCourseRepository } from "../../protocols/database/add-course-repository";

export class DbAddCourse implements AddCourse {
  constructor(private readonly addCourseRepository: AddCourseRepository) {}
  async add(course: AddCourseModel): Promise<CourseModel> {
    return await this.addCourseRepository.add(course);
  }
}

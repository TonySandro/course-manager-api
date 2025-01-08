import { CourseModel } from "../../../domain/models/course";
import { ListCourse } from "../../../domain/usecases/list-course";
import { ListCourseRepository } from "../../protocols/database/list-course-repository";

export class DbListCourse implements ListCourse {
  constructor(private readonly listCourseRepository: ListCourseRepository) {}

  async list(): Promise<CourseModel[]> {
    return await this.listCourseRepository.list();
  }
}

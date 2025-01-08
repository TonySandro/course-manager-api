import { CourseModel } from "../../../domain/models/course";

export interface ListCourseRepository {
  list(): Promise<CourseModel[]>;
}

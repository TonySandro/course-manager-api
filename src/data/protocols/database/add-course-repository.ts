import { CourseModel } from "../../../domain/models/course";
import { AddCourseModel } from "../../../domain/usecases/add-course";

export interface AddCourseRepository {
  add(course: AddCourseModel): Promise<CourseModel>;
}

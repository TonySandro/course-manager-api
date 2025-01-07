import { CourseModel } from "../../../domain/models/course";

export interface LoadCourseByTitleRepository {
  loadByTitle(title: string): Promise<CourseModel>;
}

import { CourseModel } from "../models/course";

export interface ListCourse {
  list(courseId?: string): Promise<CourseModel[]>;
}

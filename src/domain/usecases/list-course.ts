import { CourseModel } from "../models/course";

export interface ListCourse {
  list(): Promise<CourseModel[]>;
}

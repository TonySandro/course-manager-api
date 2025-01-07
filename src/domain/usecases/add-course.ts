import { CourseModel } from "../models/course";

export interface AddCourseModel {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface AddCourse {
  add(course: AddCourseModel): Promise<CourseModel>;
}

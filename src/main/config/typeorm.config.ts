import { DataSource } from "typeorm";
import { ErrorLog } from "../../domain/models/error-log";
import { CourseModel } from "../../domain/models/course";
import { ModuleModel } from "../../domain/models/module";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "admintsd",
  database: "course-platform",
  synchronize: true,
  logging: false,
  entities: [CourseModel, ModuleModel, ErrorLog],
});

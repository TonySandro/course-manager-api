import { DataSource } from "typeorm";
import { ErrorLog } from "../../domain/models/error-log";
import { AccountModel } from "../../domain/models/account";
import { CourseModel } from "../../domain/models/course";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "admintsd",
  database: "course-platform",
  synchronize: true,
  logging: false,
  entities: [AccountModel, CourseModel, ErrorLog],
});

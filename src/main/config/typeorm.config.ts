import { DataSource } from "typeorm";
import { ErrorLog } from "../../domain/models/error-log";
import { CourseModel } from "../../domain/models/course";
import { ModuleModel } from "../../domain/models/module";
import { env } from "process";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.MYSQLDB_HOST,
  port: Number(env.MYSQLDB_DOCKER_PORT),
  username: env.MYSQLDB_USER,
  password: env.MYSQLDB_ROOT_PASSWORD,
  database: env.MYSQLDB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [CourseModel, ModuleModel, ErrorLog],
});

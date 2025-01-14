import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeAddCourseController } from "../factories/add-course/add-course-factory";
import { makeListCourseController } from "../factories/list-course/list-course-factory";
import { makeAddModuleController } from "../factories/add-module/add-module-factory";
import { makeListModuleController } from "../factories/list-module/list-course-factory";

export default (router: Router): void => {
  router.post("/add-course", adaptRoute(makeAddCourseController()));
  router.get("/list-course", adaptRoute(makeListCourseController()));

  router.post("/add-module", adaptRoute(makeAddModuleController()));
  router.post("/list-module", adaptRoute(makeListModuleController()));
};

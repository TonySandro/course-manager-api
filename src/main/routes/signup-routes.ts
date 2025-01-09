import { Router } from "express";
import { makeSignUpController } from "../factories/signup/signup";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeLoginController } from "../factories/login/login-factory";
import { makeAddCourseController } from "../factories/add-course/add-course";
import { makeListCourseController } from "../factories/list-course/list-course";
import { makeAddModuleController } from "../factories/add-module/add-module-factory";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/login", adaptRoute(makeLoginController()));

  router.post("/add-course", adaptRoute(makeAddCourseController()));
  router.get("/list-course", adaptRoute(makeListCourseController()));

  router.post("/add-module", adaptRoute(makeAddModuleController()));
};

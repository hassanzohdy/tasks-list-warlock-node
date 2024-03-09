import { router } from "@mongez/warlock";
import { guardedAdmin, publicRoutes } from "app/utils/router";
import getTasks from "./controllers/get-tasks";
import getTask from "./controllers/get-task";
import restfulTasks from "./controllers/restful-tasks";

guardedAdmin(() => {
  router.restfulResource("/tasks", restfulTasks);
});

publicRoutes(() => {
  router.get("/tasks", getTasks);
  router.get("/tasks/:id", getTask);
});

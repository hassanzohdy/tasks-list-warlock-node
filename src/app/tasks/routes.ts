import { router } from "@mongez/warlock";
import { guarded, guardedAdmin } from "app/utils/router";
import getTask from "./controllers/get-task";
import getTasks from "./controllers/get-tasks";
import getTasksStatistics from "./controllers/get-tasks-statistics";
import restfulTasks from "./controllers/restful-tasks";

guardedAdmin(() => {
  router.restfulResource("/tasks", restfulTasks);
});

guarded(() => {
  router.prefix("/tasks", () => {
    router.get("/", getTasks);
    router.get("/statistics", getTasksStatistics);
    router.get("/:id", getTask);
  });
});

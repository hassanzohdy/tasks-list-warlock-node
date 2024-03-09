import { ExistsRule, Restful, RouteResource } from "@mongez/warlock";
import { User } from "app/users/models/user";
import { TaskStatus } from "../utils/flags";
import { Task } from "./../models/task";
import tasksRepository from "./../repositories/tasks-repository";

class RestfulTasks extends Restful<Task> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = tasksRepository;

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    all: {
      rules: {
        title: ["required", "string"],
        description: ["required", "string"],
        status: ["required", "in:" + Object.values(TaskStatus).join(",")],
        assignedTo: [
          "required",
          new ExistsRule(User).query(query => query.where("isAdmin", false)),
        ],
        admin: [
          "required",
          new ExistsRule(User).query(query => query.where("isAdmin", true)),
        ],
      },
    },
  };
}

const restfulTasks = new RestfulTasks();
export default restfulTasks;

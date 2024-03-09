import { ExistsRule, Restful, RouteResource } from "@mongez/warlock";
import { User } from "app/users/models/user";
import { tasksStatusList } from "../utils/flags";
import { Task } from "./../models/task";
import tasksRepository from "./../repositories/tasks-repository";

class RestfulTasks extends Restful<Task> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = tasksRepository;

  /**
   * Get exists user rule
   */
  protected existUser(isAdmin: boolean) {
    return new ExistsRule(User).query(query => query.where("isAdmin", isAdmin));
  }

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    all: {
      rules: {
        title: ["required", "string"],
        description: ["required", "string"],
        status: ["required", "in:" + tasksStatusList.join(",")],
        assignedTo: ["required", this.existUser(false)],
        admin: ["required", this.existUser(false)],
      },
    },
  };
}

const restfulTasks = new RestfulTasks();
export default restfulTasks;

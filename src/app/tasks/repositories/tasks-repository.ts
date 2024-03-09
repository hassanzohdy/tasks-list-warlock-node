import {
  FilterByOptions,
  RepositoryManager,
  RepositoryOptions,
} from "@mongez/warlock";
import { Task } from "./../models/task";

export class TasksRepository extends RepositoryManager<Task> {
  /**
   * {@inheritDoc}
   */
  public model = Task;

  /**
   * Simple columns selections
   * Set the columns that need to be selected when passing 'simple' option with 'true'
   */
  public simpleSelectColumns = ["id"];

  /**
   * List default options
   */
  protected defaultOptions: RepositoryOptions = this.withDefaultOptions({});

  /**
   * Filter By options
   */
  protected filterBy: FilterByOptions = this.withDefaultFilters({
    status: "=",
    assignedTo: ["int", "assignedTo.id"],
  });
}

const tasksRepository = new TasksRepository();

export default tasksRepository;

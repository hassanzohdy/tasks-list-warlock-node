import { Casts, Document, Model, ModelSync } from "@mongez/monpulse";
import { TaskStatisticOutput } from "app/tasks/output/task-statistic-output";
import { User } from "app/users/models/user";

export class TaskStatistic extends Model {
  /**
   * Collection name
   */
  public static collection = "taskStatistics";

  /**
   * List of models to sync with
   * To sync with a single embedded document use: [User.sync("city")],
   * this will update the city sub-document to all users when city model is updated.
   * To sync with multiple embedded documents use: [Post.syncMany("keywords")],
   * This will update the keywords sub-document to all posts when keywords model is updated.
   */
  public syncWith: ModelSync[] = [];

  /**
   * {@inheritdoc}
   */
  public static output = TaskStatisticOutput;

  /**
   * Default value for model data
   * Works only when creating new records
   */
  public defaultValue: Document = {};

  /**
   * Cast data types before saving documents into database
   */
  protected casts: Casts = {
    user: User,
    totalTasks: "int",
    totalOpenTasks: "int",
    totalClosedTasks: "int",
  };

  /**
   * Define what columns should be used when model document is embedded in another document.
   * Make sure to set only the needed columns to reduce the document size.
   * This is useful for better performance when fetching data from database.
   */
  public embedded = ["id"];
}

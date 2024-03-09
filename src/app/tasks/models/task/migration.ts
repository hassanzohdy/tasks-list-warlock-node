import { type Migration } from "@mongez/monpulse";
import { Task } from "./task";

export const TaskBluePrint = Task.blueprint();

export const taskMigration: Migration = async () => {
  TaskBluePrint.unique("id");
};

taskMigration.blueprint = TaskBluePrint;

taskMigration.down = async () => {
  TaskBluePrint.dropUniqueIndex("id");
};

import { type Migration } from "@mongez/monpulse";
import { TaskStatistic } from "./task-statistic";

export const TaskStatisticBluePrint = TaskStatistic.blueprint();

export const taskStatisticMigration: Migration = async () => {
  TaskStatisticBluePrint.unique("id");
  TaskStatisticBluePrint.index("assignedTo.id");
  TaskStatisticBluePrint.index("totalTasks");
};

taskStatisticMigration.blueprint = TaskStatisticBluePrint;

taskStatisticMigration.down = async () => {
  TaskStatisticBluePrint.dropUniqueIndex("id");
  TaskStatisticBluePrint.dropIndex("assignedTo.id");
  TaskStatisticBluePrint.dropIndex("totalTasks");
};

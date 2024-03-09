import { type Migration } from "@mongez/monpulse";
import { TaskStatistic } from "./task-statistic";

export const TaskStatisticBluePrint = TaskStatistic.blueprint();

export const taskStatisticMigration: Migration = async () => {
  TaskStatisticBluePrint.unique("id");
};

taskStatisticMigration.blueprint = TaskStatisticBluePrint;

taskStatisticMigration.down = async () => {
  TaskStatisticBluePrint.dropUniqueIndex("id");
};

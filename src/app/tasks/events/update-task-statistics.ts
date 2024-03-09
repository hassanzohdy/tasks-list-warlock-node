import { User } from "app/users/models/user";
import { Task } from "../models/task";
import { TaskStatistic } from "../models/task-statistic";
import tasksRepository from "../repositories/tasks-repository";

Task.events().onSaved((task: Task, oldTask?: Task) => {
  setAssignedTaskStatistics(task.get("assignedTo.id"));

  if (oldTask && oldTask.int("assignedTo.id") !== task.int("assignedTo.id")) {
    setAssignedTaskStatistics(oldTask.int("assignedTo.id"));
  }
});

export async function setAssignedTaskStatistics(userId: number) {
  const totalTasks = await tasksRepository.count({ assignedTo: userId });

  const totalOpenTasks = await tasksRepository.count({
    assignedTo: userId,
    status: "open",
  });

  const totalClosedTasks = await tasksRepository.count({
    assignedTo: userId,
    status: "closed",
  });

  const user = await User.find(userId);

  if (!user) return;

  const taskStatistics =
    (await TaskStatistic.first({
      "assignedTo.id": userId,
    })) || new TaskStatistic();

  console.log({
    user: user.onlyId,
    totalTasks,
    totalOpenTasks,
    totalClosedTasks,
  });

  taskStatistics.save({
    assignedTo: user,
    totalTasks,
    totalOpenTasks,
    totalClosedTasks,
  });
}

import {
  type Request,
  type RequestHandler,
  type Response,
} from "@mongez/warlock";
import { TaskStatistic } from "../models/task-statistic";

const getTasksStatistics: RequestHandler = async (
  _request: Request,
  response: Response,
) => {
  const stats = await TaskStatistic.aggregate().latest().limit(10).get();

  return response.success({
    stats,
  });
};

getTasksStatistics.description = "Get Tasks Statistics";

export default getTasksStatistics;

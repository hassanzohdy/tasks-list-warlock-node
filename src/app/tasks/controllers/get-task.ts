import {
  type RequestHandler,
  type Request,
  type Response,
} from "@mongez/warlock";
import tasksRepository from "../repositories/tasks-repository";

const getTask: RequestHandler = async (
  request: Request,
  response: Response,
) => {
  const task = await tasksRepository.get(request.int("id"));

  if (!task) {
    return response.notFound();
  }

  return response.success({
    task,
  });
};

getTask.description = "Get Task";

export default getTask;

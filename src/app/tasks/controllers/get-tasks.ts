import {
  type RequestHandler,
  type Request,
  type Response,
} from "@mongez/warlock";
import tasksRepository from "../repositories/tasks-repository";

const getTasks: RequestHandler = async (
  request: Request,
  response: Response,
) => {
  const { documents: tasks, paginationInfo } = await tasksRepository.listActive(
    request.all(),
  );

  return response.success({
    tasks,
    paginationInfo,
  });
};

getTasks.description = "Get Tasks";

export default getTasks;

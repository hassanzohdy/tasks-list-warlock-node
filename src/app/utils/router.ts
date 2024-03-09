import {
  authMiddleware,
  router,
  type Middleware,
  type Request,
  type Response,
  type RouterGroupCallback,
} from "@mongez/warlock";
import { User } from "app/users/models/user";

export async function adminUser(request: Request<User>, response: Response) {
  const user = request.user;

  if (!user.bool("isAdmin")) {
    return response.forbidden({
      error: "You are not authorized to access this route.",
    });
  }
}

export const guardedAdmin = (
  callback: RouterGroupCallback,
  moreMiddlewares: Middleware[] = [],
) => {
  return router.group(
    {
      name: "guarded.admin",
      middleware: [authMiddleware("user"), adminUser, ...moreMiddlewares],
    },
    callback,
  );
};

/**
 * Register guarded routes that requires user to be logged in to access them.
 */
export const guarded = (
  callback: RouterGroupCallback,
  moreMiddlewares: Middleware[] = [],
) => {
  return router.group(
    {
      name: "guarded.user",
      middleware: [authMiddleware("user"), ...moreMiddlewares],
    },
    callback,
  );
};

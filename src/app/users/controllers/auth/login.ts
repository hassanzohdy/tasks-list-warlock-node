import { Request, Response, t } from "@mongez/warlock";
import { User } from "app/users/models/user";

export default async function login(
  request: Request<User>,
  response: Response,
) {
  const user: User = request.user;

  const auth = await user.generateAccessToken();

  return response.success({
    user: {
      ...(await user.toJSON()),
      accessToken: auth,
      userType: user.userType,
    },
  });
}

login.validation = {
  rules: {
    email: ["required", "email"],
    password: ["required", "string"],
  },
  validate: async (request: Request, response: Response) => {
    const user = await User.attempt(request.only(["email", "password"]));

    if (!user) {
      return response.badRequest({
        error: t("auth.invalidCredentials"),
      });
    }

    request.user = user;
  },
};

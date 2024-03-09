import { router } from "@mongez/warlock";
import login from "./controllers/auth/login";

// auth
router.prefix("/auth", () => {
  router.post("/login", login);
});

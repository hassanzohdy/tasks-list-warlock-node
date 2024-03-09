import { Migration } from "@mongez/monpulse";
import { User } from "./user";

const UserBlueprint = User.blueprint();

export const userMigrations: Migration = async () => {
  UserBlueprint.unique("id");
  UserBlueprint.unique("email");
  UserBlueprint.index("isAdmin");
};

userMigrations.blueprint = UserBlueprint;

userMigrations.down = async () => {
  UserBlueprint.dropUniqueIndex("id");
  UserBlueprint.dropUniqueIndex("email");
  UserBlueprint.dropIndex("isAdmin");
};

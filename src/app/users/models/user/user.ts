import { castEmail, Casts, Document } from "@mongez/monpulse";
import { Auth, castPassword } from "@mongez/warlock";
import UserOutput from "../../output/user-output";

export class User extends Auth {
  /**
   * Collection name
   */
  public static collection = "users";

  /**
   * Output
   */
  public static output = UserOutput;

  /**
   * {@inheritdoc}
   */
  public syncWith = [];

  /**
   * Get user type
   */
  public get userType(): string {
    return "user";
  }

  /**
   * {@inheritDoc}
   */
  public defaultValue: Document = {
    isActive: false,
  };

  /**
   * {@inheritDoc}
   */
  protected casts: Casts = {
    name: "string",
    isAdmin: "boolean",
    email: castEmail,
    password: castPassword,
  };

  /**
   * {@inheritdoc}
   */
  public embedded = ["id", "name", "email", "isAdmin"];
}

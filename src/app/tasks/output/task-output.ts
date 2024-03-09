import { FinalOutput, Output } from "@mongez/warlock";
import UserOutput from "app/users/output/user-output";
import { withBaseOutputDetails } from "app/utils/output";

export class TaskOutput extends Output {
  /**
   * {@inheritdoc}
   */
  protected output: FinalOutput = withBaseOutputDetails({
    status: "string",
    title: "string",
    description: "string",
    assignedTo: UserOutput,
    admin: UserOutput,
  });
}

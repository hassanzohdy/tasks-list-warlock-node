import { FinalOutput, Output } from "@mongez/warlock";
import { withBaseOutputDetails } from "app/utils/output";

export class TaskStatisticOutput extends Output {
  /**
   * {@inheritdoc}
   */
  protected output: FinalOutput = withBaseOutputDetails({});

  /**
   * Extend the resource output
   * Called after transforming the resource output
   */
  protected async extend() {
    //
  }
}

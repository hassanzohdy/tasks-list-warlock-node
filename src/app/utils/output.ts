import { FinalOutput } from "@mongez/warlock";

/**
 * Merge the output with this function will return the base output details
 * Only and only if any of these keys are present
 */
export function withBaseOutputDetails(moreOptions: FinalOutput): FinalOutput {
  return {
    id: "integer",
    ...moreOptions,
  };
}

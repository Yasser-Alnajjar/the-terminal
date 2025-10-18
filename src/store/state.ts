import type { ProgressState } from "./progress";
import { initialValues as progressInitialValues } from "./progress";

import type { DataTableFiltersState } from "./data-table-filter";
import { initialValues as filterInitialValues } from "./data-table-filter";

export type StoreStates = ProgressState & DataTableFiltersState;
export const StoreInitialValues = {
  ...progressInitialValues,
  ...filterInitialValues,
};

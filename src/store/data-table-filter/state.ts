export type FieldType = "text" | "number" | "select" | "date" | "boolean";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  type: FieldType;
  options?: FilterOption[];
}

export interface FilterItem {
  id: string;
  operator: string;
  value?: string | any;
}

export const OPERATORS: Record<FieldType, { value: string; label: string }[]> =
  {
    text: [
      { value: "any_of", label: "any of" },
      { value: "all_of", label: "all of" },
      { value: "none_of", label: "none of" },
      { value: "is_empty", label: "is empty" },
      { value: "is_not_empty", label: "is not empty" },
    ],
    number: [
      { value: "=", label: "equals" },
      { value: ">", label: "greater than" },
      { value: "<", label: "less than" },
      { value: "is_empty", label: "is empty" },
      { value: "is_not_empty", label: "is not empty" },
    ],
    select: [
      { value: "any_of", label: "any of" },
      { value: "all_of", label: "all of" },
      { value: "none_of", label: "none of" },
      { value: "is_empty", label: "is empty" },
      { value: "is_not_empty", label: "is not empty" },
    ],
    date: [
      { value: "range", label: "date range" },
      { value: "custom", label: "custom" },
      { value: "last_7", label: "last 7 days" },
      { value: "last_30", label: "last 30 days" },
      { value: "last_90", label: "last 3 months" },
      { value: "last_180", label: "last 6 months" },
      { value: "last_365", label: "last year" },
      { value: "today", label: "today" },
    ],
    boolean: [
      { value: "true", label: "yes" },
      { value: "false", label: "no" },
      { value: "any", label: "any" },
    ],
  };

export const defaultFilter: FilterItem = { id: "", operator: "", value: "" };

export interface DataTableFiltersState {
  showFilter: boolean;
  setShowFilter: (showFilter: boolean) => void;
  filters: FilterConfig[];
  items: FilterItem[];
  onApply?: (items: FilterItem[]) => void;
  setFilters: (filters: FilterConfig[]) => void;
  setOnApply: (cb: (items: FilterItem[]) => void) => void;
  addFilter: (filter?: Partial<FilterItem>) => void;
  removeFilter: (index: number) => void;
  updateFilter: (index: number, patch: Partial<FilterItem>) => void;
  clearFilters: () => void;
  getFieldConfig: (id: string) => FilterConfig | undefined;
  formatFilterValue: (
    cfgType: FieldType,
    operator: string,
    value?: string
  ) => string;
}
export const initialValues: DataTableFiltersState = {
  showFilter: false,
  setShowFilter: () => {},
  filters: [],
  items: [],
  onApply: undefined,
  setFilters: () => {},
  setOnApply: () => {},
  addFilter: () => {},
  removeFilter: () => {},
  updateFilter: () => {},
  clearFilters: () => {},
  getFieldConfig: () => undefined,
  formatFilterValue: () => "",
};

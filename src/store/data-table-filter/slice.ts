import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  DataTableFiltersState,
  defaultFilter,
  FilterItem,
  initialValues,
} from "./state";
import { StateCreator } from "zustand";

export const filterSlice: StateCreator<DataTableFiltersState> = (set, get) => ({
  filters: initialValues.filters,
  items: initialValues.items,
  onApply: initialValues.onApply,
  showFilter: initialValues.showFilter,
  setShowFilter: (showFilter) => set({ showFilter }),
  setFilters: (filters) => set({ filters }),
  setOnApply: (cb) => set({ onApply: cb }),

  addFilter: (filter?: Partial<FilterItem>) =>
    set((state) => {
      const newFilter: FilterItem = {
        ...defaultFilter,
        ...(filter ?? {}),
      };

      if (
        newFilter.id &&
        state.items.some((item) => item.id === newFilter.id)
      ) {
        return state;
      }

      return { items: [...state.items, newFilter] };
    }),

  removeFilter: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
    })),

  updateFilter: (index, patch) =>
    set((state) => {
      const next = [...state.items];
      next[index] = { ...next[index], ...patch };
      return { items: next };
    }),

  clearFilters: () => set({ items: [] }),

  applyFilters: () => {
    const { onApply, items } = get();
    if (onApply) onApply(items);
  },

  getFieldConfig: (id) => get().filters.find((f) => f.id === id),

  formatFilterValue: (cfgType, operator, value) => {
    if (!value) return "";
    try {
      if (cfgType === "date") {
        if (operator === "range") {
          const range: DateRange = JSON.parse(value);
          const from = range?.from
            ? format(new Date(range.from), "dd/MM/yyyy")
            : "";
          const to = range?.to ? format(new Date(range.to), "dd/MM/yyyy") : "";
          return from && to ? `${from} - ${to}` : "";
        }
        if (operator === "custom") return format(new Date(value), "dd/MM/yyyy");
        if (operator.startsWith("last_") || operator === "today")
          return operator.replace("_", " ");
      }
      return value;
    } catch {
      return value;
    }
  },
});

import { create } from "zustand";

import { progressSlice } from "./progress";
import { StoreStates } from "./state";

import { filterSlice} from "./data-table-filter";

export const boundStore = create<StoreStates>()((...a) => ({
  ...progressSlice(...a),
  ...filterSlice(...a),
}));

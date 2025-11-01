import React from "react";
import { CasesList } from "../csr";
import data from "public/cases.json";
import filters from "public/filter-by-field.json";
export const List = async () => {
  return <CasesList data={data} filters={filters.Case} />;
};

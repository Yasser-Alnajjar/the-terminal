import React from "react";
import { CsrList } from "../csr";
import data from "public/dashboards.json";
import filters from "public/filter-by-field.json";
export const List = async () => {
  return <CsrList data={data} filters={filters.Case} />;
};

import React from "react";
import { CasesList } from "../csr";
import data from "public/cases.json";
export const Cases = async () => {
  return <CasesList data={data} />;
};

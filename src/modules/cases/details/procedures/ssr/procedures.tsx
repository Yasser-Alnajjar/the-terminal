import React from "react";
import { ProceduresList } from "../csr";
import data from "public/procedures.json";
export const Procedures = async () => {
  return <ProceduresList data={data} />;
};

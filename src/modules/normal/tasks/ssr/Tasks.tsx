import React from "react";
import { TasksList } from "../csr";
import data from "public/cases.json";
export const Tasks = async () => {
  return <TasksList data={data} />;
};

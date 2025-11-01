import React from "react";
import { TasksList } from "../csr";
import data from "public/tasks.json";
export const List = async () => {
  return <TasksList data={data} />;
};

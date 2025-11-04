import React from "react";
import { TasksList } from "../csr";
import data from "public/tasks.json";
export const Tasks = async ({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  const { id } = await params;
  const currentCaseTasks = data.filter((c) => c.extraData.case._id === id);

  return <TasksList data={currentCaseTasks} />;
};

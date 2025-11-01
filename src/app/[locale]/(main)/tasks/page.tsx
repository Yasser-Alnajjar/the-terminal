import React from "react";
import { Tasks } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

const page = () => {
  return <Tasks.List />;
};

export default page;

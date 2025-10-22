import React from "react";
import { NORMAL } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

const page = () => {
  return <NORMAL.Tasks />;
};

export default page;

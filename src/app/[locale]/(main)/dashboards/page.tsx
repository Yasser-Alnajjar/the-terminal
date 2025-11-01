import React from "react";
import { Dashboards } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards",
};

const page = () => {
  return <Dashboards.List />;
};

export default page;

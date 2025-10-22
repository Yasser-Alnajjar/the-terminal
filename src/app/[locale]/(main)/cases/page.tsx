import React from "react";
import { NORMAL } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases",
};

const page = () => {
  return <NORMAL.Cases />;
};

export default page;

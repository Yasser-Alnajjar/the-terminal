import React from "react";
import { Cases } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases",
};

const page = () => {
  return <Cases.List />;
};

export default page;

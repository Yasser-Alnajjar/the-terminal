import React from "react";
import { ADMIN } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizations",
};

const page = () => {
  return <ADMIN.Organizations />;
};

export default page;

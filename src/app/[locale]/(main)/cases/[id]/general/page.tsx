import { Cases } from "@modules";
import React from "react";

export const metadata = {
  title: "General - Case",
};
const page = ({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  return <Cases.Details.General params={params} />;
};

export default page;

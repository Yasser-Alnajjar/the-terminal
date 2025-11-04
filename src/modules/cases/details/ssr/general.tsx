import React from "react";
import { CsrGeneral } from "../csr";
import data from "public/cases.json";
import { ICase } from "@types";

export const General = async ({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  const { id } = await params;
  const currentCase = data.find((c) => c._id === id);
  return <CsrGeneral data={currentCase as ICase} />;
};

import React from "react";
import { CaseLayout } from "../csr";
import data from "public/cases.json";
import { ICase } from "@types";
export const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  const { id } = await params;
  const currentCase = data.find((c) => c._id === id);

  return <CaseLayout data={currentCase as ICase}>{children}</CaseLayout>;
};

import React from "react";
import { Cases } from "@modules";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  return (
    <Cases.Details.Layout params={params}>{children}</Cases.Details.Layout>
  );
};

export default Layout;

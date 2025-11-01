import React from "react";
import { Dashboard } from "../csr";
import data from "public/dashboards.json";

export const Details = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const filtered = data.find((dashboard: any) => dashboard._id === id);

  return <Dashboard data={filtered} />;
};

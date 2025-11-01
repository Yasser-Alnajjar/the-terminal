import { Dashboards } from "@modules";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return <Dashboards.Details params={params} />;
};

export default page;

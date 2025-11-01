import { Suspense } from "react";
import { Dashboards } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboards.List />
    </Suspense>
  );
};

export default page;

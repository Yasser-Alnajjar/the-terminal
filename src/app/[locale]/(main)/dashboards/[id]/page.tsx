import { Dashboards } from "@modules";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboards.Details params={params} />
    </Suspense>
  );
};

export default page;

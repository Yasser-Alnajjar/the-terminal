import { Cases } from "@modules";
import React, { Suspense } from "react";

export const metadata = {
  title: "Tasks - Case",
};
const page = async ({
  params,
}: {
  params: Promise<{ id: string; locale: "ar" | "en" }>;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cases.Details.Tasks params={params} />
    </Suspense>
  );
};

export default page;

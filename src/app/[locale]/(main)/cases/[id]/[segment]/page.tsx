import React from "react";
import { Cases } from "@modules";
import { Utils } from "@lib/utils";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ segment: string }>;
}) => {
  const segment = (await params).segment;
  return {
    title: `${Utils.toPascalCase(segment)} - Case`,
  };
};
const page = () => {
  return <Cases.Layout />;
};

export default page;

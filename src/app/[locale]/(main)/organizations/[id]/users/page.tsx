import React from "react";
import { ADMIN } from "@modules";
import { Utils } from "@lib/utils";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return {
    title: `${Utils.toPascalCase(id)} - Users`,
  };
};
const page = () => {
  return <ADMIN.Users />;
};

export default page;

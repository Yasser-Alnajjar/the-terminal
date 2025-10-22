import React from "react";
import { ADMIN } from "@modules";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = (await params).id;
  return {
    title: `${id} - Users`,
  };
};
const page = () => {
  return <ADMIN.Users />;
};

export default page;

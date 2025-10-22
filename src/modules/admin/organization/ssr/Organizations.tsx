import React from "react";
import { OrganizationList } from "../csr";
import data from "public/organizations.json";
export const Organizations = async () => {
  return <OrganizationList data={data.organizations} users={data.users} />;
};

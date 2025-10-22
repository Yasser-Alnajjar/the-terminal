import React from "react";
import { UsersList } from "../csr";
import data from "public/organizations.json";
export const Users = async () => {
  return <UsersList data={data.users} />;
};

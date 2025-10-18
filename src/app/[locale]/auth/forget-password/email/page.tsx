import React from "react";
import { Auth } from "@modules";

export const metadata = {
  title: "Email Reset Password",
};

const page = () => {
  return <Auth.Forget.Email />;
};

export default page;

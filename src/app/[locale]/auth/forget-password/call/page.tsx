import React from "react";
import { Auth } from "@modules";

export const metadata = {
  title: "Call Reset Password",
};

const page = () => {
  return <Auth.Forget.Call />;
};

export default page;

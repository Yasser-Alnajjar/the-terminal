import { Auth } from "@modules";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Forget Password",
};
const page = () => {
  return <Auth.Forget.ForgetPassword />;
};

export default page;

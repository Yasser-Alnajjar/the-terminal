import React from "react";
import { Auth } from "@modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

const page = () => {
  return <Auth.Reset.ResetPassword />;
};

export default page;

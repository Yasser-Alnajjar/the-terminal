import React from "react";
import { Auth } from "@modules";

export const metadata = {
  title: "SMS Reset Password",
};

const page = () => {
  return <Auth.Forget.SMS />;
};

export default page;

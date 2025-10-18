import { Auth } from "@modules";
import React from "react";

export const metadata = {
  title: "Reset Password Done!",
};
const page = () => {
  return <Auth.Reset.Done />;
};

export default page;

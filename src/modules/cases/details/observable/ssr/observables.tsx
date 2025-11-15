import React from "react";
import { ObservablesList } from "../csr";
import data from "public/observable.json";
export const Observables = async () => {
  return <ObservablesList data={data} />;
};

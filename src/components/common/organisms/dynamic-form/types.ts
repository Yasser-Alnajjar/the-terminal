import React from "react";

export interface IFieldOption {
  label: string;
  value: string | any;
}

export interface IFieldConfig {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string | React.ReactNode;
  col?: string;
  options?: Array<IFieldOption>;
  isArray?: boolean;
  arrayFields?: Array<IFieldConfig>;
  type?:
    | "text"
    | "number"
    | "boolean"
    | "date"
    | "select"
    | "multi-select"
    | "email"
    | "password"
    | "textarea"
    | "file"
    | "url"
    | "logo"
    | "drop-file"
    | "switch"
    | "radio"
    | "tags-select"
    | "table"
    | "checkbox"
    | "phone"
    | "array"
    | "custom";
  [key: string]: any;
}

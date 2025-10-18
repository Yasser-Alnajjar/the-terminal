import { ReactNode } from "react";

export interface IStep {
  validationSchema: any;
  initialValues: any;
  label?: string;
}

export interface FormStepperProps {
  steps: Array<IStep>;
  active?: number;
  children: ReactNode;
  onSubmit: (values: any, formikHelpers: any) => void;
  className?: string;
}

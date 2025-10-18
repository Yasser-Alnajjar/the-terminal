"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { cn } from "@lib/utils";
import { Stepper } from "./stepper";
import { FormStepperProps } from "./FormSteeperTypes";

export interface StepperFormRef {
  onBack: () => void;
}

export const StepperForm = forwardRef<StepperFormRef, FormStepperProps>(
  ({ children, steps, active = 0, onSubmit, className }, ref) => {
    const [activeStep, setActiveStep] = useState(active);

    const groups = React.Children.toArray(children);
    const stepData = steps[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    const allInitialValues = steps.reduce(
      (acc, step) => ({ ...acc, ...step.initialValues }),
      {}
    );

    const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
      if (!isLastStep) {
        setActiveStep((prev) => prev + 1);
        formikHelpers.setSubmitting(false);
      }
      onSubmit(values, formikHelpers);
    };

    const handleBack = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    useImperativeHandle(ref, () => ({
      onBack: handleBack,
    }));

    return (
      <div className="flex flex-col">
        <div className="w-full flex justify-center mb-6">
          <Stepper
            steps={steps}
            stepIndex={activeStep}
            direction="horizontal"
          />
        </div>

        <Formik
          onSubmit={handleSubmit}
          initialValues={allInitialValues}
          validationSchema={stepData.validationSchema}
        >
          {() => (
            <Form className={cn("w-full", className)}>
              {groups[activeStep]}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

StepperForm.displayName = "StepperForm";

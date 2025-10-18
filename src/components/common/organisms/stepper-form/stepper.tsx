"use client";

import React from "react";
import { cn } from "@lib/utils";
import { useLocale } from "next-intl";
import { IStep } from "./FormSteeperTypes";
import { Check } from "lucide-react";

interface StepperProps {
  steps: Array<IStep>;
  stepIndex: number;
  direction?: "vertical" | "horizontal";
}

export const Stepper = ({
  steps,
  stepIndex,
  direction = "vertical",
}: StepperProps) => {
  const locale = useLocale();
  const isVertical = direction === "vertical";

  return (
    <div
      className={cn(
        "flex relative w-full",
        isVertical
          ? "flex-col"
          : locale === "rtl"
          ? "flex-row-reverse"
          : "flex-row"
      )}
    >
      {steps.map((step, index) => {
        const isActive = stepIndex === index;
        const isCompleted = stepIndex > index;

        return (
          <div
            key={index}
            className={cn(
              "flex relative cursor-pointer w-full",
              isVertical
                ? locale === "rtl"
                  ? "flex-row-reverse items-start"
                  : "flex-row items-start"
                : "flex-col items-center"
            )}
          >
            <div
              className={cn(
                "shrink-0 w-[66.5px] h-[65.37px] flex items-center justify-center rounded-3xl",
                isActive
                  ? "bg-primary-300/16"
                  : isCompleted
                  ? "bg-primary-300/16"
                  : ""
              )}
            >
              <div
                className={cn(
                  "w-[52.07px] h-[51.85px] shrink-0 flex items-center justify-center rounded-xl border transition-colors z-10 text-3xl font-medium bg-background",
                  isActive
                    ? "border-primary-300 text-primary-400"
                    : isCompleted
                    ? "border-primary-300 bg-primary-400 text-white"
                    : "border-border text-gray-400"
                )}
              >
                {isCompleted ? <Check size={30} /> : index + 1}
              </div>
            </div>
            {step.label && (
              <h6
                className={cn(
                  "mt-2 text-2xl font-medium",
                  isActive
                    ? "text-gray-900"
                    : isCompleted
                    ? "text-gray-900"
                    : "text-gray-500"
                )}
              >
                {step.label}
              </h6>
            )}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute start-1/2 top-[33px] -translate-y-1/2 w-full h-[2px] bg-primary-400"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

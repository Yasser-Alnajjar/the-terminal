import { StateCreator } from "zustand";
import { ProgressState, initialValues } from "./state";

export const progressSlice: StateCreator<ProgressState> = (set, get) => ({
  steps: initialValues.steps,
  storageKey: initialValues.storageKey,
  completedSteps: initialValues.completedSteps,
  currentStep: initialValues.currentStep,
  setup: ({
    steps,
    storageKey,
  }: {
    steps: ProgressState["steps"];
    storageKey: ProgressState["storageKey"];
  }) => {
    set({
      steps,
      storageKey,
    });
  },
  markStepComplete: (step) => {
    const { completedSteps, getNextStep, storageKey } = get();
    const newCompleted = Array.from(new Set([...completedSteps, step]));
    const nextStep = getNextStep(step);
    const newCurrent = nextStep || step;

    set({ completedSteps: newCompleted, currentStep: newCurrent });
    if (typeof window !== "undefined") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          completedSteps: newCompleted,
          currentStep: newCurrent,
        })
      );
    }
  },

  isStepAccessible: (step) => {
    const { completedSteps, steps } = get();
    const stepIndex = steps.indexOf(step);
    if (stepIndex === 0) return true;
    const previousStep = steps[stepIndex - 1];
    return completedSteps.includes(previousStep);
  },

  getNextStep: (current) => {
    const { steps } = get();
    const currentIndex = steps.indexOf(current);
    return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  },

  getFirstIncompleteStep: () => {
    const { steps, completedSteps } = get();
    return steps.find((step) => !completedSteps.includes(step)) || steps[0];
  },

  reset: () => {
    const { steps, storageKey } = get();
    set({ completedSteps: [], currentStep: steps[0] });
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  },
});

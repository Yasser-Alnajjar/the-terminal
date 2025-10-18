export type StepId = string;

export interface ProgressState {
  steps: Array<StepId>;
  storageKey: string;
  completedSteps: Array<StepId>;
  currentStep: StepId;
  markStepComplete: (step: StepId) => void;
  isStepAccessible: (step: StepId) => boolean;
  getNextStep: (current: StepId) => StepId | null;
  getFirstIncompleteStep: () => StepId;
  reset: () => void;
  setup: ({
    steps,
    storageKey,
  }: {
    steps: ProgressState["steps"];
    storageKey: ProgressState["storageKey"];
  }) => void;
}

export const initialValues: Omit<
  ProgressState,
  | "markStepComplete"
  | "isStepAccessible"
  | "getNextStep"
  | "getFirstIncompleteStep"
  | "reset"
> = {
  steps: [],
  storageKey: "progress_employee_manually",
  completedSteps: [],
  currentStep: "",
  setup: () => {},
};

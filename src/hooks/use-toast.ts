import { cva, type VariantProps } from "class-variance-authority";
import { toast as sonnerToast, ExternalToast } from "sonner";
const toastVariants = cva("border rounded p-4 flex items-center gap-2", {
  variants: {
    variant: {
      success:
        "!border-success-500 !bg-success-50 !text-success-500 [&_svg]:!text-success-500 dark:!bg-success-800 dark:!text-success-300 dark:[&_svg]:!text-success-300",
      error:
        "!border-error-500 !bg-error-50 !text-error-500 [&_svg]:!text-error-500 dark:!bg-error-800 dark:!text-error-300 dark:[&_svg]:!text-error-300",
      warning:
        "!border-warning-500 !bg-warning-50 !text-warning-500 [&_svg]:!text-warning-500 dark:!bg-warning-800 dark:!text-warning-300 dark:[&_svg]:!text-warning-300",
      info: "!border-primary-500 !bg-primary-50 !text-primary-500 [&_svg]:!text-primary-500 dark:!bg-primary-800 dark:!text-primary-300 dark:[&_svg]:!text-primary-300",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

interface ToastProps extends ExternalToast, VariantProps<typeof toastVariants> {
  title: string;
}
function toast({ title, variant, ...props }: ToastProps) {
  return sonnerToast(title, {
    ...props,
    className: toastVariants({ variant }),
    position: "bottom-left",
    classNames: {
      icon: "[&>svg]:!shrink-0 [&>svg]:!size-4 mx-0",
      title: "!leading-[100%]",
    },
  });
}
export const useToast = () => {
  return {
    toast,
  };
};

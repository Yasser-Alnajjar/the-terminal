import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Button,
} from "@components";
import { Form, FormikProvider, useFormik } from "formik";

export const Responders = ({
  close,
  open,
  row,
}: {
  close: () => void;
  open: boolean;
  row?: any;
}) => {
  const formik = useFormik({
    initialValues: {
      template: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="min-w-[45vw] p-0 h-full flex-col flex gap-0">
        <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
          <SheetTitle className="flex items-center gap-2 text-base !font-normal text-white">
            Run actions on case #{row._id}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-2 flex-1">
          <FormikProvider value={formik}>
            <Form>
              {/* <FieldRenderer
                field={{
                  name: "template",
                  type: "select",
                  options: [
                    {
                      label: "Template 1",
                      value: "template-1",
                    },
                    {
                      label: "Template 2",
                      value: "template-2",
                    },
                  ],
                }}
              /> */}
            </Form>
          </FormikProvider>
        </div>
        <SheetFooter className="px-4 py-2 border-t border-border bg-gray-50">
          <>
            <Button
              variant="ghost"
              className="text-error-500 hover:text-error-500"
            >
              Cancel
            </Button>
            <Button>Confirm</Button>
          </>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

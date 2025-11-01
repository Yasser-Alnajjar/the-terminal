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
import { MessageBox } from "src/components/common/icons/message-box";

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
  console.log("row", row);

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
            <Form className="w-full h-full">
              <div className="w-full h-full flex justify-center items-center flex-col gap-2">
                <MessageBox width={60} height={40} />
                <p>No Actions</p>
              </div>
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

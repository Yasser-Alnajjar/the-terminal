import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  Button,
  IFieldConfig,
  FormikField,
  SheetTrigger,
} from "@components";
import { Form, FormikProvider, useFormik } from "formik";
import { Plus } from "lucide-react";
import users from "public/users.json";
export const AddTask = () => {
  const [open, setOpen] = React.useState(false);

  const fields: Array<IFieldConfig> = [
    {
      name: "group",
      label: "Group",
      required: true,
      type: "select",
      options: [
        { label: "Group 1", value: "group-1" },
        { label: "Group 2", value: "group-2" },
        { label: "Group 3", value: "group-3" },
      ],
    },
    {
      name: "title",
      label: "Title",
      placeholder: "Task Title",
      required: true,
    },
    {
      name: "dueDate",
      label: "Due Date",
      type: "date",
    },
    {
      name: "assignee",
      label: "Assignee",
      type: "select",
      options: users.map((user: any) => ({
        label: user.name,
        value: user.login,
      })),
    },
    {
      name: "description",
      label: "Description",
      type: "editor",
    },
    {
      name: "mandatory",
      label: "Mandatory",
      type: "switch",
      description: "At least one log must be present",
      // col: "col-span-2",
    },
    {
      name: "flag",
      label: "Flag this task?",
      type: "switch",
      // col: "col-span-2",
    },
  ];
  const formik = useFormik({
    initialValues: {
      group: "",
      title: "",
      dueDate: null,
      mandatory: false,
      flag: false,
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setOpen(false);
    },
    enableReinitialize: true,
  });

  return (
    <Sheet
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        formik.resetForm();
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="primary-outline"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Plus size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[45vw] p-0 h-full flex-col flex gap-0">
        <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
          <SheetTitle className="flex items-center gap-2 text-base !font-normal text-white">
            Adding a Task
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-2 flex-1">
          <FormikProvider value={formik}>
            <Form className="w-full grid grid-cols-12 gap-6">
              {fields.map((field) => (
                <FormikField field={field} formik={formik} key={field.name} />
              ))}
            </Form>
          </FormikProvider>
        </div>
        <SheetFooter className="px-4 py-2 border-t border-border bg-gray-50">
          <>
            <Button variant="error-outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary-outline"
              onClick={() => formik.resetForm()}
              disabled={!formik.dirty}
            >
              Save and add another
            </Button>
            <Button disabled={!formik.dirty}>Confirm</Button>
          </>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

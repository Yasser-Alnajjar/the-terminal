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
  MitreAttack,
} from "@components";
import { Form, FormikProvider, useFormik } from "formik";
import { Plus } from "lucide-react";

export const AddProcedure = () => {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      value: "",
      tlp: "0",
      pap: "0",
      ioc: false,
      sighted: false,
      sightedAt: 0,
      ignore_similarity: false,
      description: "",
      technique: [],
      occur_date: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setOpen(false);
    },
    enableReinitialize: false,
  });

  const handleTechniqueChange = React.useCallback(
    (items: string[]) => {
      if (formik.values.technique !== items) {
        formik.setFieldValue("technique", items);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik.values.technique]
  );

  const fields: Array<IFieldConfig> = [
    {
      name: "occur_date",
      label: "Occur date",
      type: "datetime",
    },
    {
      name: "technique",
      label: "Technique",
      type: "custom",
      custom: <MitreAttack selectedItems={handleTechniqueChange} />,
    },
  ];

  return (
    <Sheet
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (state) formik.resetForm();
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
            Adding an Observable
          </SheetTitle>
        </SheetHeader>

        <div className="p-4 space-y-2 flex-1 max-h-[90vh] overflow-y-auto">
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

            <Button
              disabled={!formik.dirty}
              onClick={() => formik.submitForm()}
            >
              Confirm
            </Button>
          </>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

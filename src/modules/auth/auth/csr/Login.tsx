"use client";
import React, { useEffect } from "react";
import {
  useBuildYupSchema,
  useQueryParams,
  useToast,
  useTranslate,
} from "@hooks";
import { FormikHelpers } from "formik";
import { signIn, useSession } from "next-auth/react";
import {
  Button,
  Form,
  GrowSpinner,
  IFieldConfig,
  LanguageSwitch,
  ToggleTheme,
} from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@navigation";
import { Mail } from "lucide-react";

export const Login = () => {
  const t = useTranslate("auth");
  const { toast } = useToast();
  const { getQueryObject } = useQueryParams();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(searchParams.get("callbackUrl") ?? "/");
    }
  }, [status, router, searchParams]);

  const fields: IFieldConfig[] = [
    {
      name: "email",
      type: "email",
      label: t("email"),
      placeholder: t("placeholder.enter", {
        field: t("email"),
      }),
      icon: <Mail size={20} className="text-gray-400" />,
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: t("password"),
      label: t("password"),
      required: true,
    },
  ];

  const validationSchema = useBuildYupSchema(fields);
  const onSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    const res = await signIn("local-json", {
      login: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: getQueryObject().callbackUrl ?? "/",
    });
    if (res?.ok) {
      toast({
        title: t("login_success"),
        description: t("login_success_description"),
      });
    } else {
      toast({
        title: t("login_failed"),
        description: t("login_failed_description"),
        variant: "error",
      });
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <section className="bg-background flex justify-center items-center min-h-screen py-5">
      <div className="max-w-lg w-full relative p-10 bg-background max-h-[90vh] rounded-4xl shadow-[0px_4px_6px_-2px_#0D3E7308,0px_12px_16px_-4px_#0D3E7314]  border border-border/30">
        <h2 className="text-4xl font-bold text-center mb-4">{t("login")}</h2>
        <AnimatePresence>
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Form
              fields={fields}
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Button
                    type="submit"
                    className="w-full h-12 flex items-center justify-center gap-1 mb-8 rounded-xl"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
                      <GrowSpinner className="bg-primary-200" />
                    ) : (
                      t("login")
                    )}
                  </Button>
                );
              }}
            </Form>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 start-4 flex items-center justify-between gap-4 w-full pe-10">
          <LanguageSwitch className="bg-transparent rounded-2xl" />
          <ToggleTheme className="w-fit gap-2" />
        </div>
      </div>
    </section>
  );
};

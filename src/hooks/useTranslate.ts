import { useTranslations } from "next-intl";

export const useTranslate = (namespace?: string) => {
  return useTranslations(namespace || "Index");
};

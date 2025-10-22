"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { useToast } from "./use-toast";

export function useClipboard(timeout = 1500) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("common.clipboard");

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: t("title"),
        description: t("description"),
      });
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error("Copy failed:", err);
      toast({
        title: t("error_title"),
        description: t("error_description"),
        variant: "error",
      });
    }
  };

  return { copied, copy };
}

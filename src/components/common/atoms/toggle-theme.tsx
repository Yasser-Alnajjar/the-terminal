"use client";

import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@lib/utils";
import { Switch } from "./switch";
import { useTranslate } from "@hooks";

export function ToggleTheme({ className }: { className?: string }) {
  const t = useTranslate("profile");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Moon size={16} />
        {t("dark")}
      </div>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}

"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LanguageSwitch,
  ToggleTheme,
} from "@components";

import { cn } from "@lib/utils";
import { useTranslate } from "@hooks";
import { useLocale } from "next-intl";

export const ProfileDropdown = ({ className }: { className?: string }) => {
  const t = useTranslate("profile");
  const { data: session } = useSession();
  const locale = useLocale();

  return (
    <DropdownMenu modal={false} dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Profile"
          className={cn("rounded-full relative", className)}
          variant="ghost"
          size="icon"
        >
          <Avatar>
            <AvatarFallback className="capitalize">
              {session?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"} className="w-64 p-2 rounded-2xl">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8">
              <AvatarFallback className="capitalize rounded-lg">
                {session?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium capitalize">
                {session?.user?.name}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {session?.user?._createdBy}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ToggleTheme className="hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" />
        <LanguageSwitch className="w-full" />
        <DropdownMenuSeparator />
        <div className="flex items-center justify-center">
          <Button
            variant="error"
            className="w-full border-transparent"
            size={"sm"}
            onClick={() => signOut({ callbackUrl: "/auth" })}
          >
            {t("sign_out")}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

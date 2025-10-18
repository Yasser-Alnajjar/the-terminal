"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@components";
import { INavItem } from "./types";
import { usePathname, Link } from "@navigation";
import { useLocale } from "next-intl";
import { cn } from "@lib/utils";
import { ChevronDown } from "lucide-react";

export function DesktopNavigation({ items }: { items: INavItem[] }) {
  const pathname = usePathname();
  const locale = useLocale();

  const renderMenu = (menuItems: INavItem[]) =>
    menuItems.map((item, index) => {
      const hasChildren = item.children && item.children.length > 0;
      const isChildActive = item.children?.some(
        (child) => child.link === pathname
      );

      const isActive = item.matcher && pathname.startsWith(item.matcher);

      if (hasChildren) {
        return (
          <DropdownMenu key={index} dir={locale === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "text-sm focus:outline-none flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer data-[state=open]:[&_svg]:rotate-180",
                  "data-[state=open]:bg-primary-400 data-[state=open]:text-white hover:bg-primary-300  hover:text-white ",
                  isChildActive &&
                    "bg-primary-400 text-white hover:bg-primary-300  hover:text-white "
                )}
              >
                {item.title}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transform transition-transform duration-300",
                    isChildActive && "rotate-180"
                  )}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[12rem] max-h-[400px] overflow-auto">
              {item.children!.map((child) => {
                const isChildActive = child.children?.some(
                  (child) => child.link === pathname
                );
                return child.children && child.children.length > 0 ? (
                  <DropdownMenuSub key={child.title}>
                    <DropdownMenuSubTrigger
                      className={cn(
                        "data-[state=open]:bg-primary-400 data-[state=open]:text-white hover:!bg-primary-400  hover:!text-white",
                        isChildActive && "bg-primary-400 text-white  "
                      )}
                    >
                      {child.title}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {renderMenu(child.children)}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem key={child.title} asChild>
                    <Link
                      href={child.link}
                      data-state={child.link === pathname ? "open" : "closed"}
                      className={cn(
                        "text-sm data-[state=open]:bg-primary-400 data-[state=open]:text-white  hover:bg-primary-400  hover:text-white "
                      )}
                    >
                      {child.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      return (
        <DropdownMenu key={index}>
          <DropdownMenuTrigger asChild>
            <Link
              href={item.link}
              data-state={
                isActive || item.link === pathname ? "open" : "closed"
              }
              className={cn(
                "flex px-3 py-2 rounded-md text-sm",
                "data-[state=open]:bg-primary-400 data-[state=open]:text-white  hover:bg-primary-300  hover:text-white "
              )}
            >
              {item.title}
            </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>
      );
    });

  return (
    <div className="hidden md:flex gap-4" dir={locale === "ar" ? "rtl" : "ltr"}>
      {renderMenu(items)}
    </div>
  );
}

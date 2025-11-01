"use client";

import { Input, ProfileDropdown, Separator, SidebarTrigger } from "@components";
import { usePathname } from "@navigation";
import { Search } from "lucide-react";

function formatPageName(path: string): string {
  if (!path || path === "/") return "The Terminal";

  const segments = path.split("/").filter(Boolean);
  const last = segments.at(-1)!;

  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Header() {
  const pathname = usePathname();
  const pageTitle = formatPageName(pathname);

  return (
    <header className="flex min-h-[calc(var(--header-height)+10px)] py-2 shrink-0 items-center gap-2 border-b border-border transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-base font-medium capitalize">{pageTitle}</h1>
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>

        <Input
          icon={<Search />}
          placeholder="Search..."
          className="w-full max-w-lg hidden md:block"
        />
        <div className="flex items-center gap-2">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

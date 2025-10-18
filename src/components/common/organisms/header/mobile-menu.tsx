"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  Button,
  SheetClose,
} from "@components";
import { Menu } from "lucide-react";
import { Navigation } from "./navigation";
import { INavItem } from "./types";
import Image from "next/image";
import { Link } from "@navigation";

export const MobileMenu = ({ items }: { items: Array<INavItem> }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="p-0 bg-gray-200">
      <SheetHeader className="p-4 border-b">
        <SheetTitle>
          <SheetClose asChild>
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="object-contain"
              />
            </Link>
          </SheetClose>
        </SheetTitle>
      </SheetHeader>
      <div className="p-4 space-y-2">
        <Navigation items={items} />
      </div>
    </SheetContent>
  </Sheet>
);

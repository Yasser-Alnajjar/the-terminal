import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  SheetTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components";
import { cn } from "@lib/utils";
import { groupPatterns } from "./helpers";
import ttp from "public/ttp.json";
export const Technique = ({ row }: { row: any }) => {
  const patterns = groupPatterns(ttp);
  const pattern = patterns.find((p) => p._id === row.pattern._id);
  console.log(pattern);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="hover:no-underline text-primary-400">
          {row.pattern.patternId}
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[45vw] p-0 h-full flex-col flex gap-0">
        <SheetHeader className="px-4 py-2 border-b-2 border-primary-400 bg-primary-800 dark:bg-primary-25 text-white">
          <SheetTitle className="flex items-center gap-2 text-base !font-normal text-white">
            {row.pattern.name}
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 p-4 gap-2">
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm">Sub-technique Name</h5>
            <p className="text-xs">{row.pattern.name}</p>
          </div>
          {row.patternParent && (
            <div className="flex flex-col gap-1">
              <h5 className="font-semibold text-sm">Sub-Technique of</h5>
              <p className="text-xs">{row.patternParent.name}</p>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold">Url</h5>
            <a
              href={row.pattern.url}
              title={row.pattern.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary-400 hover:underline truncate"
            >
              {row.pattern.url}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm">Remote Support</h5>
            <p className="text-xs">
              {row.pattern.remoteSupport ? "Yes" : "No"}
            </p>
          </div>
          <div
            className={cn(
              "flex flex-col gap-1",
              row.patternParent ? "col-span-2" : "col-span-1"
            )}
          >
            <h5 className="font-semibold text-sm">Data Sources</h5>
            <p className="text-xs">{row.pattern.dataSources}</p>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <h5 className="font-semibold text-sm">Description</h5>
            <p className="text-xs">{row.pattern.description}</p>
          </div>
        </div>
        <div className="p-4">
          {pattern && pattern?.children && pattern?.children?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="text-start">
                  <TableHead className="text-start text-xs font-semibold">
                    Id
                  </TableHead>
                  <TableHead className="text-start text-xs font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="text-start text-xs font-semibold">
                    Tactics
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pattern?.children?.map((p: any) => (
                  <TableRow
                    key={p.patternId}
                    className={cn(
                      "group border-b !border-s-2 border-s-transparent hover:!border-s-2 data-[state=selected]:!border-s data-[state=selected]:border-s-primary-400 hover:border-s-primary-400  hover:bg-primary-25"
                    )}
                  >
                    <TableCell className="text-xs">{p.patternId}</TableCell>
                    <TableCell className="text-xs">{p.name}</TableCell>
                    <TableCell className="text-xs">{p.tactics}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

"use client";

import React, { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@components";
import { ChevronRight } from "lucide-react";
interface DynamicTabsSliderProps<T> {
  data: T[];
  statusTabs: string[];
  getStatus: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  initialStatus?: string;
  onStatusChange?: (status: string) => void;
}

export function DynamicTabsSlider<T>({
  data,
  statusTabs,
  getStatus,
  renderItem,
  initialStatus,
  onStatusChange,
}: DynamicTabsSliderProps<T>) {
  const [currentStatus, setCurrentStatus] = useState(
    initialStatus ?? statusTabs[0]
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleTabChange = (status: string) => {
    setCurrentStatus(status);
    if (onStatusChange) onStatusChange(status);
    if (emblaApi) emblaApi.scrollTo(0);
  };

  const filteredData = data.filter((item) => getStatus(item) === currentStatus);

  return (
    <Tabs value={currentStatus} onValueChange={handleTabChange}>
      <TabsList className="gap-0 space-x-3 bg-transparent flex-wrap">
        {statusTabs.map((status) => (
          <TabsTrigger
            key={status}
            value={status}
            className="capitalize h-6 px-2 text-sm data-[state='active']:!shadow-none data-[state='active']:!bg-gray-300 hover:!bg-foreground/20"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} (
            {data.filter((item) => getStatus(item) === status).length})
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={currentStatus}>
        {filteredData.length === 0 ? (
          <p className="p-4 text-center">
            No items with status &ldquo;{currentStatus}&rdquo;
          </p>
        ) : (
          <div className="flex items-center gap-2 relative">
            <div
              ref={emblaRef}
              className="z-10 flex-1 overflow-hidden rounded-3xl border border-border shadow-lg bg-gray-200"
            >
              <div className="flex select-none touch-pan-x">
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-full p-4"
                    style={{ minWidth: "100%" }}
                  >
                    {renderItem(item, index)}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute w-[calc(100%-2rem)] -bottom-3 z-[1] left-1/2 -translate-x-1/2 opacity-90 p-4 rounded-3xl bg-gray-200 border border-gray-200 shadow-lg min-h-[100px]"></div>
            <div className="absolute w-[calc(100%-3rem)] -bottom-5 z-[0] left-1/2 -translate-x-1/2 opacity-90 p-4 rounded-3xl bg-gray-200 border border-gray-200 shadow-lg min-h-[100px]"></div>

            <Button
              size="icon"
              variant="outline"
              onClick={scrollNext}
              aria-label="Next"
              className="absolute z-50 -right-2 top-1/2 -translate-y-1/2 rounded-full"
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

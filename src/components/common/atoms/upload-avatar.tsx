"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
} from "@components";
import { cn } from "@lib/utils";

export interface UploadAvatarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  defaultPreview?: string;
  clear?: boolean;
}

export const UploadAvatar = React.forwardRef<
  HTMLInputElement,
  UploadAvatarProps
>(({ clear, onChange, className, defaultPreview, ...props }, ref) => {
  const [preview, setPreview] = React.useState<string | null>(
    defaultPreview ?? null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    onChange?.(event);
  };
  const onClear = () => {
    setPreview(null);
    if (ref && "current" in ref && ref.current) ref.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={props.id ?? "upload-avatar"}
        className={cn("inline-block max-w-fit cursor-pointer", className)}
      >
        <Avatar className="size-20 border-[1.5px] border-transparent hover:border-primary-400 transition-colors duration-300">
          <AvatarImage key={preview} src={preview || ""} alt="Avatar preview" />
          <AvatarFallback className="transition-colors bg-primary-50 text-5xl">
            ?
          </AvatarFallback>
        </Avatar>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id={props.id ?? "upload-avatar"}
          ref={ref}
          onChange={handleFileChange}
          {...props}
        />
      </Label>

      {clear && preview && (
        <Button
          variant="link"
          className="p-0 h-auto text-primary-500 hover:no-underline"
          onClick={onClear}
        >
          Clear
        </Button>
      )}
    </div>
  );
});

UploadAvatar.displayName = "UploadAvatar";

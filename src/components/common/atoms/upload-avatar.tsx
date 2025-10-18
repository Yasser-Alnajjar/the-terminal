"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage, Label } from "@components";
import { cn } from "@lib/utils";
import { ImageUp } from "lucide-react";

export interface UploadAvatarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const UploadAvatar = React.forwardRef<
  HTMLInputElement,
  UploadAvatarProps
>(({ onChange, className, ...props }, ref) => {
  const [preview, setPreview] = React.useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    onChange?.(event);
  };

  return (
    <Label
      htmlFor={props.id ?? "upload-avatar"}
      className={cn("inline-block max-w-fit cursor-pointer", className)}
    >
      <Avatar className="size-[100px] border-[1.5px] border-dashed border-border">
        <AvatarImage src={preview} />
        <AvatarFallback className="transition-colors bg-primary-25 hover:bg-primary-50 text-gray-500">
          <ImageUp className="size-6" />
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
  );
});

UploadAvatar.displayName = "UploadAvatar";

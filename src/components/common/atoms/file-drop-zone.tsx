"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import { X, FileText, CloudUpload, Trash2 } from "lucide-react";
import { cn, Utils } from "@lib/utils";
import { useTranslate } from "@hooks";

interface IFileProps {
  value?: File[];
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  accept?: string[];
}

interface FileWithStatus extends File {
  id: string;
  status: "uploading" | "success" | "error";
  progress: number;
}

export function FileDropZone({
  value = [],
  multiple = false,
  onChange,
  accept,
}: IFileProps) {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [attachmentType, setAttachmentType] = useState<string>("");
  const t = useTranslate("dropzone");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        size: file.size,
        name: file.name,
        type: file.type,
        arrayBuffer: file.arrayBuffer,
        bytes: file.bytes,
        lastModified: file.lastModified,
        webkitRelativePath: file.webkitRelativePath,
        slice: file.slice,
        text: file.text,
        stream: file.stream,
        id: Math.random().toString(36).substr(2, 9),
        status: "uploading" as const,
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                const newProgress = f.progress + 20;
                if (newProgress >= 100) {
                  clearInterval(interval);
                  return { ...f, progress: 100, status: "success" };
                }
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, 200);
      });

      const allFiles = [...value, ...acceptedFiles];
      onChange?.(multiple ? allFiles : [acceptedFiles[0]]);
    },
    [value, multiple, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept: Utils.convertExtensionsToAcceptObject(accept || []),
  });

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    const remainingFiles = files.filter((f) => f.id !== fileId);
    onChange?.(remainingFiles);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Select value={attachmentType} onValueChange={setAttachmentType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("attachmentTypePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="document">{t("document")}</SelectItem>
            <SelectItem value="image">{t("image")}</SelectItem>
            <SelectItem value="pdf">{t("pdf")}</SelectItem>
            <SelectItem value="other">{t("other")}</SelectItem>
          </SelectContent>
        </Select>

        <div
          {...getRootProps()}
          className={cn(
            "bg-primary-25 border-border/36 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-2">
            <div className="text-base mb-6">
              <div className="mb-3 flex items-center gap-2">
                <span>{t("dragAndDropText")}</span>
                <button
                  type="button"
                  className="cursor-pointer text-primary-400 underline"
                >
                  {t("chooseFile")}
                </button>
              </div>
              <p className="text-xs text-gray-500">{t("supportedFormats")}</p>
            </div>
            <div className="flex flex-col items-center text-gray-500">
              <CloudUpload size={38} />
              <p className="text-xs">{t("maxSize")}</p>
            </div>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file) => {
            return (
              <div
                key={file.id}
                className={cn(
                  "relative flex items-center space-x-3 p-3 rounded-lg border border-border",
                  file.status === "uploading" && "uploading before:start-0",
                  file.status === "success" && "bg-primary-50"
                )}
              >
                <style jsx>
                  {`
                    .uploading:before {
                      content: "";
                      position: absolute;
                      top: 0;
                      width: ${file.progress}%;
                      height: 100%;
                      transition: width 0.2s ease-out;
                      background-color: var(--color-primary-25);
                      z-index: -1;
                    }
                  `}
                </style>
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.size < 1024
                      ? `${file.size.toFixed(2)} B`
                      : file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(2)} KB`
                      : file.size < 1024 * 1024 * 1024
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                      : `${(file.size / 1024 / 1024 / 1024).toFixed(2)} GB`}
                    |{" "}
                    {file.status === "uploading"
                      ? `${file.progress.toFixed(2)}%`
                      : file.status === "success"
                      ? t("completed")
                      : t("failed")}
                  </p>
                </div>

                <Button
                  variant="error"
                  size="icon"
                  onClick={() => removeFile(file.id)}
                  className="shrink-0 rounded-full"
                >
                  {file.status === "success" ? (
                    <Trash2 className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

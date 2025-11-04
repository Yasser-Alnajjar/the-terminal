"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Line,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components";
import { MoreHorizontal, Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ILog } from "@types";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import { useToast } from "@hooks";

export const Logs = ({ data }: { data: ILog[] }) => {
  const { toast } = useToast();
  return (
    <div>
      <Line className="flex items-center justify-between">
        <div className="mx-10 px-5 flex items-center gap-2">
          Activity ({data.length})
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-dashed"
          >
            <Plus size={16} />
          </Button>
        </div>
      </Line>

      <div className="space-y-3">
        {data.map((activity) => (
          <div
            key={activity._id}
            className="group relative border border-border rounded-xl p-2 "
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="primary-outline"
                  size="icon"
                  className="group-hover:opacity-100 opacity-0 data-[state=open]:opacity-100 transition-opacity duration-300 absolute end-11"
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Edit",
                      description: "Edit not implemented yet!",
                      variant: "error",
                    });
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Delete",
                      description: "Delete not implemented yet!",
                      variant: "error",
                    });
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="absolute top-2 end-2 size-7">
                    <AvatarFallback className="capitalize">
                      {activity._createdBy.at(0)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="capitalize">
                    {activity._createdBy.split("@").at(0)}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <MarkdownRenderer content={activity.message} />

            <span className="text-xxs text-muted-foreground whitespace-nowrap">
              {new Date(activity.date).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface MarkdownProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownProps) {
  const { toast } = useToast();

  const components: Components = {
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      if (node?.tagName === "code") {
        const codeString = React.Children.toArray(children)
          .map((child) =>
            typeof child === "string"
              ? child
              : (child as any)?.props?.children || ""
          )
          .join("")
          .trim();
        return (
          <pre className="relative">
            <Button
              type="button"
              variant="outline"
              className="absolute top-2 end-3 text-xxs !py-0.5 px-2"
              onClick={() => {
                navigator.clipboard.writeText(codeString);
                toast({
                  title: "Copied",
                  description: "Code copied to clipboard",
                });
              }}
            >
              Copy
            </Button>
            <code className={`hljs language-${match?.[1] || ""}`} {...props}>
              {children}
            </code>
          </pre>
        );
      }

      // Inline code
      return (
        <code className={`hljs ${className || ""}`} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <article className={`markdown-body max-w-none ${className || ""}`}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          rehypeSlug,
          rehypeAutolinkHeadings,
        ]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

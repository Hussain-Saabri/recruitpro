import React from "react";
import { cn } from "../../lib/utils";

export default function Separator({
  orientation = "horizontal",
  className,
  ...props
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-gray-200",
        orientation === "horizontal" ? "h-[1.5px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}

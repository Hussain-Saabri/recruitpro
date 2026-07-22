import React from "react";
import { RefreshCcw } from "lucide-react";
import Button from "./Button";
import { cn } from "../../lib/utils";

export default function ResetButton({
  onClick,
  label = "Reset",
  className,
  ...props
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn("h-7 px-3 text-[13px] font-medium text-gray-600 rounded-[5px] bg-white border-gray-200 cursor-pointer", className)}
      {...props}
    >
      <RefreshCcw size={13} className="font-bold " />
      {label}
    </Button>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants: Record<string, string> = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs shadow-primary/20",
      secondary:
        "bg-white border border-gray-300 text-foreground hover:bg-gray-50 shadow-xs",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-secondary",
      ghost:
        "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 shadow-xs shadow-rose-600/20",
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-3 text-xs font-medium",
      md: "h-10 px-4 text-sm font-medium",
      lg: "h-11 px-6 text-sm font-semibold",
      icon: "h-10 w-10 p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg min-w-[100px] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          size === "icon" && "min-w-0",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

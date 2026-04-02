"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "ghost" | "glass";
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable, children, ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "bg-surface rounded-xl p-5 shadow-xs border border-border/50",
      outline: "bg-transparent rounded-xl p-5 border border-border",
      ghost: "bg-transparent rounded-xl p-5",
      glass: "bg-surface/80 backdrop-blur-xl rounded-xl p-5 shadow-xs border border-border/50",
    };

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          hoverable !== false && "transition-shadow hover:shadow-md",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 space-y-1", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-medium text-foreground", className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
);

const CardContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm", className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-5 pt-4 border-t border-border/50 flex items-center justify-between", className)}
    {...props}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

import * as React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'large' | 'muted' | 'lead';
  display?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', display, ...props }, ref) => {
    let Component: React.ElementType = variant as React.ElementType;
    if (['small', 'muted', 'lead', 'large'].includes(variant)) Component = 'p';
    
    const variants: Record<string, string> = {
      h1: "text-2xl font-semibold text-foreground tracking-tight",
      h2: "text-xl font-semibold text-foreground tracking-tight",
      h3: "text-lg font-medium text-foreground",
      h4: "text-base font-medium text-foreground",
      p: "text-sm text-gray-600 leading-relaxed",
      lead: "text-lg text-muted-foreground leading-relaxed",
      large: "text-lg font-medium text-foreground",
      small: "text-xs text-gray-400",
      muted: "text-sm text-muted-foreground",
    };

    const displayVariants: Record<string, string> = {
      h1: "text-3xl font-semibold text-foreground tracking-tight",
      h2: "text-2xl font-semibold text-foreground tracking-tight",
      h3: "text-xl font-medium text-foreground",
    };

    const base = (display && displayVariants[variant]) || variants[variant];

    return (
      <Component
        ref={ref}
        className={cn(base, className)}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export { Typography };

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer group scale-110">
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          {...props}
        />
        <div className={cn(
          "w-10 h-5.5 bg-secondary border border-border/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[18px] rtl:peer-checked:after:-translate-x-[18px] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all after:shadow-sm peer-checked:bg-primary transition-colors",
          className
        )}></div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

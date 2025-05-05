import { classNames } from "@/utils/helpers";
import { forwardRef, HTMLAttributes } from "react";

export const BaseNode = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={classNames(
      "relative rounded-md border p-5 text-foreground-text bg-background-node",
      !!className && className,
      selected ? "border-muted-foreground shadow-lg" : "",
      "hover:ring-1"
    )}
    tabIndex={0}
    {...props}
  />
));

BaseNode.displayName = "BaseNode";

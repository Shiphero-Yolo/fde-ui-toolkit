import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Input component with consistent styling using the mandatory color palette
 *
 * Features:
 * - Focus ring using ring color
 * - Border using input color
 * - Placeholder using muted-foreground
 * - Disabled state with reduced opacity
 *
 * @example
 * <Input placeholder="Enter text..." />
 * <Input type="email" placeholder="Email" />
 * <Input disabled placeholder="Disabled" />
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none ring-0 ring-ring ring-inset focus-visible:ring-2 transition-shadow duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

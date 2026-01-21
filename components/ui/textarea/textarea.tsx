import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Textarea component with consistent styling
 * Uses the mandatory color palette for borders and focus states
 *
 * @example
 * <Textarea placeholder="Enter your message..." />
 * <Textarea rows={5} />
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none ring-0 ring-ring ring-inset focus-visible:ring-2 transition-shadow duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

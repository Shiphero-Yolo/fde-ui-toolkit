"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { animate } from "animejs"
import { cn } from "../../../lib/utils"

/**
 * Animated check indicator
 */
const AnimatedCheckIndicator = () => {
  const iconRef = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (iconRef.current) {
      animate(iconRef.current, {
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        duration: 200,
        ease: "outCubic",
      })
    }
  }, [])

  return <Check ref={iconRef} className="h-4 w-4" />
}

/**
 * Checkbox component built on Radix UI
 * Uses the primary color from the mandatory palette for checked state
 *
 * @example
 * <Checkbox id="terms" />
 * <Label htmlFor="terms">Accept terms</Label>
 *
 * // Controlled
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <AnimatedCheckIndicator />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

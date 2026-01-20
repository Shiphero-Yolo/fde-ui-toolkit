import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * cn("px-4 py-2", "bg-primary", className)
 * cn("text-sm", { "font-bold": isBold })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

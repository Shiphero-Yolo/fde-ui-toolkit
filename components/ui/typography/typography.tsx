"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"

/**
 * =============================================================================
 * SKUNKWORKS UI - TYPOGRAPHY SYSTEM
 * =============================================================================
 *
 * FONT FAMILY
 * -----------
 * Primary: Geist Sans (--font-geist-sans)
 * Monospace: Geist Mono (--font-geist-mono)
 *
 * The Geist font family is a modern, clean sans-serif designed for readability
 * across all screen sizes. It provides excellent legibility for both UI elements
 * and long-form content.
 *
 * FONT WEIGHTS
 * ------------
 * - Regular (400): Body text, captions, labels
 * - Medium (500): Subtle emphasis, subheadings
 * - Semibold (600): Strong emphasis, buttons, important labels
 * - Bold (700): Headings, titles, critical information
 *
 * BORDER RADIUS
 * -------------
 * The design system uses a consistent border radius scale:
 * - --radius: 0.5rem (8px) - Base radius for cards, dialogs
 * - --radius-md: calc(var(--radius) - 2px) - Medium elements like inputs
 * - --radius-sm: calc(var(--radius) - 4px) - Small elements like badges
 * - rounded-full: Pills, avatars, circular buttons
 *
 * STYLING GUIDELINES
 * ------------------
 * 1. Use semantic typography components instead of raw HTML tags
 * 2. Maintain consistent spacing using Tailwind's spacing scale
 * 3. Use the muted-foreground color for secondary text
 * 4. Avoid pure black (#000) and pure white (#FFF) - use foreground/background
 * 5. Headings should have tight letter-spacing (tracking-tight)
 * 6. Body text should have relaxed line-height for readability
 *
 * =============================================================================
 */

type TypographyWeight = "regular" | "medium" | "semibold" | "bold"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  weight?: TypographyWeight
  as?: React.ElementType
}

const weightClasses: Record<TypographyWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

/**
 * Title - Primary page titles
 * Use for main page headings and hero sections
 *
 * @example
 * <Title>Welcome to Skunkworks</Title>
 * <Title weight="semibold">Dashboard</Title>
 */
const Title = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "bold", children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "text-4xl tracking-tight text-foreground md:text-5xl",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
)
Title.displayName = "Title"

/**
 * Subtitle - Secondary titles and taglines
 * Use below titles or for section introductions
 *
 * @example
 * <Subtitle>A comprehensive component library</Subtitle>
 */
const Subtitle = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, weight = "regular", children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-xl text-muted-foreground md:text-2xl",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
Subtitle.displayName = "Subtitle"

/**
 * H1 - Level 1 Heading
 * Use for main section headings
 */
const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "bold", children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "text-3xl tracking-tight text-foreground md:text-4xl",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
)
H1.displayName = "H1"

/**
 * H2 - Level 2 Heading
 * Use for major subsections
 */
const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "semibold", children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-2xl tracking-tight text-foreground md:text-3xl",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
)
H2.displayName = "H2"

/**
 * H3 - Level 3 Heading
 * Use for subsections within H2 sections
 */
const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "semibold", children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl tracking-tight text-foreground md:text-2xl",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
)
H3.displayName = "H3"

/**
 * H4 - Level 4 Heading
 * Use for card titles and smaller sections
 */
const H4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "semibold", children, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(
        "text-lg tracking-tight text-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
)
H4.displayName = "H4"

/**
 * H5 - Level 5 Heading
 * Use for smaller card titles and labels
 */
const H5 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "semibold", children, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(
        "text-base tracking-tight text-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h5>
  )
)
H5.displayName = "H5"

/**
 * H6 - Level 6 Heading
 * Use for the smallest headings and overlines
 */
const H6 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, weight = "semibold", children, ...props }, ref) => (
    <h6
      ref={ref}
      className={cn(
        "text-sm uppercase tracking-wide text-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </h6>
  )
)
H6.displayName = "H6"

/**
 * Body - Standard body text
 * Use for paragraphs and general content
 *
 * @example
 * <Body>This is a paragraph of text.</Body>
 * <Body weight="semibold">Important information</Body>
 */
const Body = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, weight = "regular", children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-base leading-relaxed text-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
Body.displayName = "Body"

/**
 * BodySmall - Smaller body text
 * Use for secondary content and descriptions
 */
const BodySmall = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, weight = "regular", children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm leading-relaxed text-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
BodySmall.displayName = "BodySmall"

/**
 * Caption - Small text for labels and metadata
 * Use for timestamps, labels, and helper text
 *
 * @example
 * <Caption>Last updated 2 hours ago</Caption>
 * <Caption weight="medium">Required field</Caption>
 */
const Caption = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ className, weight = "regular", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "text-xs leading-normal text-muted-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)
Caption.displayName = "Caption"

/**
 * Overline - Small uppercase text
 * Use for labels above headings or section markers
 *
 * @example
 * <Overline>Getting Started</Overline>
 * <H2>Installation</H2>
 */
const Overline = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ className, weight = "medium", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "text-xs uppercase tracking-widest text-muted-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)
Overline.displayName = "Overline"

/**
 * Lead - Larger introductory text
 * Use for article leads or important introductions
 */
const Lead = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, weight = "regular", children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-lg leading-relaxed text-muted-foreground md:text-xl",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
Lead.displayName = "Lead"

/**
 * InlineCode - Inline code snippets
 * Use for code references within text
 */
const InlineCode = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
)
InlineCode.displayName = "InlineCode"

/**
 * Blockquote - Quoted text
 * Use for quotations and callouts
 */
const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(
  ({ className, children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "border-l-4 border-border pl-4 italic text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
)
Blockquote.displayName = "Blockquote"

/**
 * Muted - Muted/secondary text
 * Use for less important information
 */
const Muted = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, weight = "regular", children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground",
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
Muted.displayName = "Muted"

export {
  Title,
  Subtitle,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  BodySmall,
  Caption,
  Overline,
  Lead,
  InlineCode,
  Blockquote,
  Muted,
}

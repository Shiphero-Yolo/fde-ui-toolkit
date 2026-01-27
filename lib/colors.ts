/**
 * FDE-UI-TOOLKIT - Color Constants
 *
 * These are the mandatory color CSS variables used throughout the component library.
 * Import these constants to ensure consistent color usage across your application.
 */

// CSS Variable names for use in Tailwind classes
export const CSS_VARS = {
  // Background & Foreground
  background: "var(--background)",
  foreground: "var(--foreground)",

  // Card
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",

  // Popover
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",

  // Primary
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",

  // Secondary
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",

  // Muted
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",

  // Accent
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",

  // Destructive
  destructive: "var(--destructive)",
  destructiveForeground: "var(--destructive-foreground)",

  // Border & Input
  border: "var(--border)",
  input: "var(--input)",

  // Ring
  ring: "var(--ring)",

  // Chart colors
  chart1: "var(--chart-1)",
  chart2: "var(--chart-2)",
  chart3: "var(--chart-3)",
  chart4: "var(--chart-4)",
  chart5: "var(--chart-5)",

  // Sidebar
  sidebar: "var(--sidebar-background)",
  sidebarForeground: "var(--sidebar-foreground)",
  sidebarPrimary: "var(--sidebar-primary)",
  sidebarPrimaryForeground: "var(--sidebar-primary-foreground)",
  sidebarAccent: "var(--sidebar-accent)",
  sidebarAccentForeground: "var(--sidebar-accent-foreground)",
  sidebarBorder: "var(--sidebar-border)",
  sidebarRing: "var(--sidebar-ring)",

  // Brand
  brand: "var(--brand)",
  brandTeal: "var(--brand-teal)",

  // Radius
  radius: "var(--radius)",
} as const;

// Tailwind class names for backgrounds
export const BG_COLORS = {
  background: "bg-background",
  foreground: "bg-foreground",
  card: "bg-card",
  popover: "bg-popover",
  primary: "bg-primary",
  secondary: "bg-secondary",
  muted: "bg-muted",
  accent: "bg-accent",
  destructive: "bg-destructive",
  border: "bg-border",
  input: "bg-input",
  ring: "bg-ring",
  chart1: "bg-chart-1",
  chart2: "bg-chart-2",
  chart3: "bg-chart-3",
  chart4: "bg-chart-4",
  chart5: "bg-chart-5",
  sidebar: "bg-sidebar",
  sidebarPrimary: "bg-sidebar-primary",
  sidebarAccent: "bg-sidebar-accent",
  brand: "bg-brand",
  brandTeal: "bg-brand-teal",
} as const;

// Tailwind class names for text colors
export const TEXT_COLORS = {
  foreground: "text-foreground",
  background: "text-background",
  cardForeground: "text-card-foreground",
  popoverForeground: "text-popover-foreground",
  primaryForeground: "text-primary-foreground",
  secondaryForeground: "text-secondary-foreground",
  mutedForeground: "text-muted-foreground",
  accentForeground: "text-accent-foreground",
  destructiveForeground: "text-destructive-foreground",
  sidebarForeground: "text-sidebar-foreground",
  sidebarPrimaryForeground: "text-sidebar-primary-foreground",
  sidebarAccentForeground: "text-sidebar-accent-foreground",
} as const;

// Tailwind class names for border colors
export const BORDER_COLORS = {
  border: "border-border",
  input: "border-input",
  ring: "border-ring",
  primary: "border-primary",
  secondary: "border-secondary",
  destructive: "border-destructive",
  muted: "border-muted",
  accent: "border-accent",
  sidebarBorder: "border-sidebar-border",
} as const;

// HSL values for light theme (for reference/documentation)
export const LIGHT_THEME = {
  background: "0 0% 100%",
  foreground: "0 0% 3.9%",
  card: "0 0% 100%",
  cardForeground: "0 0% 3.9%",
  popover: "0 0% 100%",
  popoverForeground: "0 0% 3.9%",
  primary: "0 0% 9%",
  primaryForeground: "0 0% 98%",
  secondary: "0 0% 96.1%",
  secondaryForeground: "0 0% 9%",
  muted: "0 0% 96.1%",
  mutedForeground: "0 0% 45.1%",
  accent: "0 0% 96.1%",
  accentForeground: "0 0% 9%",
  destructive: "0 84.2% 60.2%",
  destructiveForeground: "0 0% 98%",
  border: "0 0% 89.8%",
  input: "0 0% 89.8%",
  ring: "0 0% 3.9%",
  chart1: "12 76% 61%",
  chart2: "173 58% 39%",
  chart3: "197 37% 24%",
  chart4: "43 74% 66%",
  chart5: "27 87% 67%",
  radius: "0.5rem",
  sidebarBackground: "0 0% 98%",
  sidebarForeground: "240 5.3% 26.1%",
  sidebarPrimary: "240 5.9% 10%",
  sidebarPrimaryForeground: "0 0% 98%",
  sidebarAccent: "240 4.8% 95.9%",
  sidebarAccentForeground: "240 5.9% 10%",
  sidebarBorder: "220 13% 91%",
  sidebarRing: "217.2 91.2% 59.8%",
  brand: "168 18% 58%",
  brandTeal: "168 18% 58%",
} as const;

// HSL values for dark theme (for reference/documentation)
export const DARK_THEME = {
  background: "0 0% 3.9%",
  foreground: "0 0% 98%",
  card: "0 0% 3.9%",
  cardForeground: "0 0% 98%",
  popover: "0 0% 3.9%",
  popoverForeground: "0 0% 98%",
  primary: "0 0% 98%",
  primaryForeground: "0 0% 9%",
  secondary: "0 0% 14.9%",
  secondaryForeground: "0 0% 98%",
  muted: "0 0% 14.9%",
  mutedForeground: "0 0% 63.9%",
  accent: "0 0% 14.9%",
  accentForeground: "0 0% 98%",
  destructive: "0 62.8% 30.6%",
  destructiveForeground: "0 0% 98%",
  border: "0 0% 14.9%",
  input: "0 0% 14.9%",
  ring: "0 0% 83.1%",
  chart1: "220 70% 50%",
  chart2: "160 60% 45%",
  chart3: "30 80% 55%",
  chart4: "280 65% 60%",
  chart5: "340 75% 55%",
  sidebarBackground: "240 5.9% 10%",
  sidebarForeground: "240 4.8% 95.9%",
  sidebarPrimary: "224.3 76.3% 48%",
  sidebarPrimaryForeground: "0 0% 100%",
  sidebarAccent: "240 3.7% 15.9%",
  sidebarAccentForeground: "240 4.8% 95.9%",
  sidebarBorder: "240 3.7% 15.9%",
  sidebarRing: "217.2 91.2% 59.8%",
} as const;

// Type exports
export type CSSVar = keyof typeof CSS_VARS;
export type BgColor = keyof typeof BG_COLORS;
export type TextColor = keyof typeof TEXT_COLORS;
export type BorderColor = keyof typeof BORDER_COLORS;

"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../../lib/utils"

export interface LoginPageProps {
  /** App logo image source */
  logoSrc: string
  /** Alt text for logo */
  logoAlt?: string
  /** App name displayed in header */
  appName: string
  /** Subtitle/description displayed in header */
  subtitle?: string
  /** Background image source */
  backgroundImage?: string
  /** Form title (default: "Sign In") */
  formTitle?: string
  /** Whether the page is in a loading state */
  isLoading?: boolean
  /** Loading message to display */
  loadingMessage?: string
  /** Form content to render */
  children: React.ReactNode
  /** Additional className for the container */
  className?: string
  /** Whether to render in contained mode (fits within parent container instead of full screen) */
  contained?: boolean
}

/**
 * Reusable login page layout component
 * Features a split-screen design with background image on desktop,
 * and a centered card layout on mobile/tablet.
 *
 * @example
 * <LoginPage
 *   logoSrc="/logo.png"
 *   appName="My App"
 *   subtitle="Welcome back"
 *   backgroundImage="/bg.jpg"
 *   isLoading={authLoading}
 * >
 *   <form onSubmit={handleSubmit}>
 *     <Input ... />
 *     <Button type="submit">Sign In</Button>
 *   </form>
 * </LoginPage>
 */
export function LoginPage({
  logoSrc,
  logoAlt = "Logo",
  appName,
  subtitle,
  backgroundImage,
  formTitle = "Sign In",
  isLoading = false,
  loadingMessage = "Loading...",
  children,
  className,
  contained = false,
}: LoginPageProps) {
  // Show loading state
  if (isLoading) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-50",
        contained ? "h-full" : "min-h-screen"
      )}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex relative",
        contained ? "h-full" : "min-h-screen",
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Login Form Container */}
      {/* Mobile: Centered with padding creating frame */}
      {/* Tablet/iPad: Centered with padding creating frame */}
      {/* Desktop: Left side split-screen (original layout) */}
      <div className={cn(
        "relative z-10 w-full flex items-center justify-center",
        contained
          ? "p-4 lg:w-1/2 lg:justify-start lg:pl-8"
          : "p-4 sm:p-6 md:p-8 lg:w-1/2 lg:justify-start lg:pl-16 lg:p-0 lg:py-8"
      )}>
        <div className={cn(
          "bg-white rounded-3xl w-full shadow-2xl",
          contained
            ? "p-6 max-w-sm"
            : "p-8 sm:p-12 md:p-16 lg:p-12 max-w-xl sm:max-w-3xl md:max-w-4xl lg:max-w-md"
        )}>
          {/* Header with logo */}
          <div className={cn(
            contained ? "mb-4" : "mb-6 sm:mb-10 md:mb-12 lg:mb-10"
          )}>
            <div className={cn(
              "flex items-center text-center sm:text-left",
              contained
                ? "flex-row justify-start gap-3"
                : "flex-col sm:flex-row justify-center sm:justify-start lg:items-center lg:justify-start gap-4 sm:gap-5 md:gap-6 lg:gap-4"
            )}>
              <img
                src={logoSrc}
                alt={logoAlt}
                className={cn(
                  "w-auto",
                  contained ? "h-8" : "h-12 sm:h-16 md:h-20 lg:h-12"
                )}
              />
              <div>
                <h1 className={cn(
                  "font-bold text-gray-900",
                  contained ? "text-lg" : "text-xl sm:text-3xl md:text-4xl lg:text-2xl"
                )}>
                  Welcome to {appName}
                </h1>
                {subtitle && (
                  <p className={cn(
                    "text-gray-600 mt-1",
                    contained ? "text-xs" : "text-sm sm:text-lg md:text-xl lg:text-base"
                  )}>
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className={cn(
            "bg-gray-50",
            contained
              ? "rounded-xl p-4"
              : "rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-2xl p-6 sm:p-10 md:p-12 lg:p-8"
          )}>
            <h2 className={cn(
              "font-bold text-gray-900 text-center sm:text-left",
              contained ? "text-base mb-4" : "text-xl sm:text-3xl md:text-4xl lg:text-2xl mb-6 sm:mb-10 md:mb-12 lg:mb-6"
            )}>
              {formTitle}
            </h2>

            <div className={cn(
              "mx-auto",
              contained ? "" : "max-w-3xl lg:max-w-none"
            )}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Background visible (Desktop only) */}
      <div className="hidden lg:block lg:w-1/2" />
    </div>
  )
}

export default LoginPage

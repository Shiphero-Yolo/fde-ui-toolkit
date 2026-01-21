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
}: LoginPageProps) {
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("min-h-screen flex relative", className)}
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
      <div className="relative z-10 w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:w-1/2 lg:justify-start lg:pl-16 lg:p-0 lg:py-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 lg:p-12 w-full max-w-xl sm:max-w-3xl md:max-w-4xl lg:max-w-md shadow-2xl">
          {/* Header with logo */}
          <div className="mb-6 sm:mb-10 md:mb-12 lg:mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start lg:items-center lg:justify-start gap-4 sm:gap-5 md:gap-6 lg:gap-4 text-center sm:text-left">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-12 sm:h-16 md:h-20 lg:h-12 w-auto"
              />
              <div>
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-2xl font-bold text-gray-900">
                  Welcome to {appName}
                </h1>
                {subtitle && (
                  <p className="text-sm sm:text-lg md:text-xl lg:text-base text-gray-600 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-2xl p-6 sm:p-10 md:p-12 lg:p-8">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-10 md:mb-12 lg:mb-6 text-center sm:text-left">
              {formTitle}
            </h2>

            <div className="max-w-3xl lg:max-w-none mx-auto">
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

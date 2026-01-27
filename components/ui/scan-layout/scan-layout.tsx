"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Input } from "../input";

export type ScanStatus = "idle" | "success" | "error";

export interface ScanLayoutProps {
  /** Title displayed above the main heading */
  title?: string;
  /** Main heading text (e.g., "Scan Item") */
  heading: string;
  /** Icon or image to display above the heading */
  icon?: React.ReactNode;
  /** Placeholder text for the scan input */
  placeholder?: string;
  /** Current scan status - controls background color */
  status?: ScanStatus;
  /** Error message to display */
  errorMessage?: string;
  /** Called when a scan is submitted */
  onScan: (value: string) => void | Promise<void>;
  /** Called when back button is clicked */
  onBack?: () => void;
  /** URL for back navigation (alternative to onBack) */
  backHref?: string;
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Loading message to display */
  loadingMessage?: string;
  /** Custom content to display instead of the default scan UI */
  children?: React.ReactNode;
  /** Custom success icon */
  successIcon?: React.ReactNode;
  /** Custom error icon */
  errorIcon?: React.ReactNode;
  /** Show feedback icon (success or error) */
  showFeedbackIcon?: boolean;
  /** Feedback icon type to show */
  feedbackIconType?: "success" | "error" | null;
  /** Default/idle background color class */
  idleColor?: string;
  /** Success background color class */
  successColor?: string;
  /** Error background color class */
  errorColor?: string;
  /** Additional className for the container */
  className?: string;
  /** Whether to auto-focus the input */
  autoFocus?: boolean;
  /** Whether to render in contained mode (fits within parent container instead of full screen) */
  contained?: boolean;
  /** Duration in ms for status to auto-reset (0 = no auto-reset) */
  statusResetDelay?: number;
  /** Called after status auto-resets */
  onStatusReset?: () => void;
}

/**
 * A full-screen scan layout component for barcode/QR scanning workflows.
 * Provides visual feedback, auto-focusing input, and status-based backgrounds.
 *
 * Features:
 * - Full-screen overlay optimized for scanning devices (handhelds, tablets)
 * - Auto-focusing input that maintains focus for seamless scanning
 * - Status-based background colors (idle, success, error)
 * - Automatic status reset with configurable delay
 * - Support for custom icons and feedback states
 * - Optional back navigation via callback or href
 * - Loading state with spinner
 * - Responsive design with mobile-optimized hidden input
 *
 * @example
 * // Basic usage with status management
 * const [status, setStatus] = useState<ScanStatus>("idle");
 * const [error, setError] = useState<string | null>(null);
 *
 * const handleScan = async (value: string) => {
 *   try {
 *     await processBarcode(value);
 *     setStatus("success");
 *   } catch (err) {
 *     setStatus("error");
 *     setError(err.message);
 *   }
 * };
 *
 * <ScanLayout
 *   heading="Scan Item"
 *   title="Inventory"
 *   icon={<Package className="h-full w-full" />}
 *   status={status}
 *   errorMessage={error}
 *   onScan={handleScan}
 *   onBack={() => router.back()}
 *   statusResetDelay={1500}
 *   onStatusReset={() => {
 *     setStatus("idle");
 *     setError(null);
 *   }}
 * />
 *
 * @example
 * // With feedback icon display
 * <ScanLayout
 *   heading="Check In"
 *   status={status}
 *   onScan={handleScan}
 *   showFeedbackIcon={true}
 *   feedbackIconType={status === "idle" ? null : status === "success" ? "success" : "error"}
 *   statusResetDelay={2000}
 * />
 *
 * @example
 * // With custom colors
 * <ScanLayout
 *   heading="Scan Badge"
 *   onScan={handleScan}
 *   idleColor="bg-blue-600"
 *   successColor="bg-green-500"
 *   errorColor="bg-red-500"
 * />
 *
 * @example
 * // With custom content via children
 * <ScanLayout
 *   heading="Custom Scan"
 *   onScan={handleScan}
 * >
 *   <div className="text-white text-center">
 *     <h1>Custom Content Here</h1>
 *     <p>The input is still active and listening</p>
 *   </div>
 * </ScanLayout>
 */
function ScanLayout({
  title,
  heading,
  icon,
  placeholder = "Scan barcode or QR code",
  status = "idle",
  errorMessage,
  onScan,
  onBack,
  backHref,
  loading = false,
  loadingMessage = "Loading...",
  children,
  successIcon,
  errorIcon,
  showFeedbackIcon = false,
  feedbackIconType = null,
  idleColor = "bg-primary",
  successColor = "bg-chart-2",
  errorColor = "bg-destructive",
  className,
  autoFocus = true,
  contained = false,
  statusResetDelay = 0,
  onStatusReset,
}: ScanLayoutProps) {
  const [inputValue, setInputValue] = useState("");
  const [localStatus, setLocalStatus] = useState<ScanStatus>(status);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local status with prop
  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  // Auto-reset status after delay
  useEffect(() => {
    if (statusResetDelay > 0 && localStatus !== "idle") {
      const timer = setTimeout(() => {
        setLocalStatus("idle");
        onStatusReset?.();
      }, statusResetDelay);
      return () => clearTimeout(timer);
    }
  }, [localStatus, statusResetDelay, onStatusReset]);

  // Auto-focus management for seamless scanning
  useEffect(() => {
    if (!autoFocus) return;

    const focusInput = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Focus on mount
    focusInput();

    // Auto-refocus when input loses focus
    const handleBlur = () => {
      setTimeout(focusInput, 100);
    };

    // Auto-refocus on page clicks (unless clicking on interactive elements)
    const handlePageClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && !target.closest("button, a, input, select, textarea")) {
        setTimeout(focusInput, 50);
      }
    };

    // Auto-refocus when window regains focus
    const handleWindowFocus = () => {
      setTimeout(focusInput, 100);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener("blur", handleBlur);
    }
    document.addEventListener("click", handlePageClick);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      if (input) {
        input.removeEventListener("blur", handleBlur);
      }
      document.removeEventListener("click", handlePageClick);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [autoFocus]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const value = inputValue.trim();
      setInputValue("");
      await onScan(value);
    },
    [inputValue, onScan]
  );

  // Get background color based on status
  const getBgColor = () => {
    switch (localStatus) {
      case "success":
        return successColor;
      case "error":
        return errorColor;
      default:
        return idleColor;
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div
        className={cn(
          contained ? "absolute inset-0" : "fixed inset-0 z-50",
          "flex flex-col items-center justify-center transition-colors duration-300",
          idleColor,
          className
        )}
      >
        <div className="text-center text-primary-foreground">
          <div className={cn(
            "animate-spin rounded-full border-b-2 border-current mx-auto",
            contained ? "h-12 w-12 mb-2" : "h-32 w-32 mb-4"
          )} />
          <p className={contained ? "text-sm" : "text-xl"}>{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Render feedback icon if showing
  if (showFeedbackIcon && feedbackIconType) {
    const iconSize = contained ? "h-16 w-16" : "h-48 w-48";
    const FeedbackIcon =
      feedbackIconType === "success"
        ? successIcon || <Check className={iconSize} />
        : errorIcon || <X className={iconSize} />;

    return (
      <div
        className={cn(
          contained ? "absolute inset-0" : "fixed inset-0 z-10",
          "flex flex-col items-center justify-center transition-colors duration-300",
          getBgColor(),
          className
        )}
      >
        {/* Back button */}
        {(onBack || backHref) && (
          <BackButton onBack={onBack} backHref={backHref} />
        )}

        <div className={cn(
          "flex items-center justify-center text-primary-foreground",
          contained ? "min-h-[100px]" : "min-h-[400px]"
        )}>
          {FeedbackIcon}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        contained ? "absolute inset-0" : "fixed inset-0 z-10",
        "flex flex-col items-center justify-center transition-colors duration-300",
        getBgColor(),
        className
      )}
    >
      {/* Back button */}
      {(onBack || backHref) && (
        <BackButton onBack={onBack} backHref={backHref} />
      )}

      {/* Custom children or default scan UI */}
      {children || (
        <div className="flex flex-col items-center justify-center">
          {/* Icon */}
          {icon && (
            <div className={cn(
              "flex items-center justify-center text-primary-foreground",
              contained ? "w-16 h-16 mb-3" : "w-48 h-48 mb-8"
            )}>
              {icon}
            </div>
          )}

          {/* Title and Heading */}
          <div className={cn(
            "text-center text-primary-foreground",
            contained ? "mb-3" : "mb-8"
          )}>
            {title && <h2 className={cn(
              "font-bold mb-1",
              contained ? "text-sm" : "text-2xl mb-2"
            )}>{title}</h2>}
            <h1 className={cn(
              "font-bold",
              contained ? "text-2xl" : "text-6xl"
            )}>{heading}</h1>
          </div>

          {/* Scan Input */}
          <form onSubmit={handleSubmit} className={cn(
            "w-full",
            contained ? "max-w-[180px]" : "max-w-xs"
          )}>
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={cn(
                "lg:bg-primary-foreground/10 lg:border-primary-foreground/30 text-primary-foreground lg:text-center placeholder:text-primary-foreground/50 absolute lg:relative opacity-0 lg:opacity-100 -z-10 lg:z-auto",
                contained ? "text-sm lg:h-8" : "text-xl lg:h-12"
              )}
              placeholder={placeholder}
              autoFocus={autoFocus}
            />
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div className={cn(
              "bg-destructive text-destructive-foreground rounded-md text-center",
              contained ? "mt-2 px-2 py-1 text-xs max-w-[180px]" : "mt-4 px-4 py-2 max-w-xs"
            )}>
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {/* Flash animation styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes successFlash {
            0% { background-color: rgba(74, 222, 128, 0); }
            50% { background-color: rgba(74, 222, 128, 0.3); }
            100% { background-color: rgba(74, 222, 128, 0); }
          }
          @keyframes errorFlash {
            0% { background-color: rgba(239, 68, 68, 0); }
            50% { background-color: rgba(239, 68, 68, 0.3); }
            100% { background-color: rgba(239, 68, 68, 0); }
          }
          .success-flash { animation: successFlash 0.3s ease-in-out; }
          .error-flash { animation: errorFlash 0.3s ease-in-out; }
        `,
        }}
      />
    </div>
  );
}

// Back button component
function BackButton({
  onBack,
  backHref,
}: {
  onBack?: () => void;
  backHref?: string;
}) {
  if (backHref) {
    return (
      <a
        href={backHref}
        className="absolute top-4 left-4 text-primary-foreground p-2 rounded-full hover:bg-primary-foreground/10 hidden lg:block"
      >
        <ArrowLeft className="h-6 w-6" />
      </a>
    );
  }

  if (onBack) {
    return (
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-primary-foreground p-2 rounded-full hover:bg-primary-foreground/10 hidden lg:block"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
    );
  }

  return null;
}

export { ScanLayout };

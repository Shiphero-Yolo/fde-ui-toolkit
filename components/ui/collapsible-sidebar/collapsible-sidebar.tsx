"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Badge } from "../badge";
import { cn } from "../../../lib/utils";

export interface NavSubItem {
  href: string;
  label: string;
  badge?: number;
}

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: number;
  expandable?: boolean;
  expanded?: boolean;
  section?: string;
  subItems?: NavSubItem[];
  mobileVisible?: boolean;
}

export interface CollapsibleSidebarProps {
  /** Navigation items to display */
  navItems: NavItem[];
  /** Current pathname for active state detection */
  pathname?: string;
  /** Logo image source */
  logoSrc?: string;
  /** Application name */
  appName?: string;
  /** Custom logo component (overrides logoSrc) */
  logo?: React.ReactNode;
  /** Footer content (e.g., user profile) - can be ReactNode or function that receives expanded state */
  footer?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
  /** Callback when navigation occurs */
  onNavigate?: (href: string) => void;
  /** Custom class name */
  className?: string;
  /** Default expanded sections */
  defaultExpandedSections?: Record<string, boolean>;
  /** Use absolute positioning instead of fixed (for contained demos) */
  contained?: boolean;
}

export function CollapsibleSidebar({
  navItems,
  pathname = "",
  logoSrc,
  appName = "App",
  logo,
  footer,
  onNavigate,
  className,
  defaultExpandedSections = {},
  contained = false,
}: CollapsibleSidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(defaultExpandedSections);

  // Reset expanded state when navigating
  useEffect(() => {
    setExpanded(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleSection = (section: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setExpanded(true);
  };

  const handleLinkClick = (href: string) => {
    onNavigate?.(href);
  };

  // Merge nav items with expanded state
  const navItemsWithState = navItems.map((item) => ({
    ...item,
    expanded: item.section ? expandedSections[item.section] : false,
  }));

  return (
    <>
      {/* Hamburger Button (Mobile only, hidden when contained) */}
      {!contained && !mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-[100] lg:hidden p-2"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>
      )}

      {/* Backdrop (Mobile only, hidden when contained) */}
      {!contained && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "top-0 left-0 h-full z-[70] flex flex-col border-r bg-white shadow-md transition-all duration-300 ease-in-out",
          contained ? "absolute" : "fixed",
          expanded || mobileMenuOpen ? "w-64" : "w-16",
          contained ? "translate-x-0" : (mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"),
          className
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => !mobileMenuOpen && setExpanded(false)}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-start px-3 border-b">
          <Link href="/" className="flex items-center gap-3" onClick={() => handleLinkClick("/")}>
            {logo ? (
              logo
            ) : logoSrc ? (
              <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={logoSrc}
                  alt={`${appName} Logo`}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm">
                  {appName.charAt(0)}
                </span>
              </div>
            )}
            {(expanded || mobileMenuOpen) && (
              <span className="text-xl font-semibold">{appName}</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {navItemsWithState.map((item) => (
              <div
                key={item.href}
                className={item.mobileVisible === false ? "hidden lg:block" : ""}
              >
                {item.expandable ? (
                  <button
                    onClick={(e) => item.section && toggleSection(item.section, e)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 my-1 transition-colors w-full text-left",
                      item.active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(expanded || mobileMenuOpen) && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">
                            {item.badge}
                          </Badge>
                        )}
                        {item.expandable && (
                          <div className="ml-auto">
                            {item.expanded ? (
                              <ChevronDown className="h-4 w-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-slate-500" />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 my-1 transition-colors",
                      item.active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(expanded || mobileMenuOpen) && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )}

                {/* Sub Items */}
                {item.expandable && item.expanded && (expanded || mobileMenuOpen) && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => handleLinkClick(subItem.href)}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === subItem.href
                            ? "bg-slate-100 text-slate-900"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        )}
                      >
                        <span>{subItem.label}</span>
                        {subItem.badge && (
                          <Badge className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">
                            {subItem.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-auto p-2 border-t">
            {typeof footer === "function"
              ? (footer as (props: { expanded: boolean }) => React.ReactNode)({
                  expanded: expanded || mobileMenuOpen,
                })
              : footer}
          </div>
        )}
      </div>
    </>
  );
}

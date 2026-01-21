"use client";

import * as React from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Alert, AlertTitle } from "../alert";
import { cn } from "../../../lib/utils";

export interface SettingsTab {
  /** Unique identifier for the tab */
  value: string;
  /** Display label for the tab */
  label: string;
  /** Tab content */
  content: React.ReactNode;
}

export interface SettingsPageProps {
  /** Page title */
  title?: string;
  /** Tabs to display */
  tabs: SettingsTab[];
  /** Default active tab */
  defaultTab?: string;
  /** Sidebar component */
  sidebar?: React.ReactNode;
  /** Show save success message */
  saveSuccess?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Loading message */
  loadingMessage?: string;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export function SettingsPage({
  title = "Settings",
  tabs,
  defaultTab,
  sidebar,
  saveSuccess,
  loading,
  loadingMessage = "Loading settings...",
  headerContent,
  className,
}: SettingsPageProps) {
  if (loading) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        {sidebar}
        <div className="min-h-screen lg:pl-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{loadingMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {sidebar}
      <div className="min-h-screen lg:pl-16">
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          {saveSuccess && (
            <Alert className="w-auto border-green-200 bg-green-50 text-green-800 py-1 px-3">
              <Check className="h-4 w-4" />
              <AlertTitle className="ml-2">Settings saved successfully</AlertTitle>
            </Alert>
          )}
          {headerContent}
        </header>

        <main className="p-6">
          <Tabs defaultValue={defaultTab || tabs[0]?.value} className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className={cn("grid w-full max-w-lg", `grid-cols-${Math.min(tabs.length, 5)}`)}>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="space-y-6">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
}

// Reusable Settings Card Component
export interface SettingsCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description?: string;
  /** Title icon */
  icon?: React.ReactNode;
  /** Card content */
  children: React.ReactNode;
  /** Show footer with save button */
  showFooter?: boolean;
  /** Save button text */
  saveText?: string;
  /** Saving state */
  saving?: boolean;
  /** On save callback */
  onSave?: () => void;
  /** Custom footer content */
  footerContent?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export function SettingsCard({
  title,
  description,
  icon,
  children,
  showFooter = true,
  saveText = "Save Changes",
  saving,
  onSave,
  footerContent,
  className,
}: SettingsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className={cn(icon && "flex items-center")}>
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {showFooter && (
        <CardFooter className="flex justify-end border-t px-6 py-4">
          {footerContent || (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onSave}
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : saveText}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

// Section Header Component
export interface SettingsSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Custom class name */
  className?: string;
}

export function SettingsSection({ title, description, className }: SettingsSectionProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

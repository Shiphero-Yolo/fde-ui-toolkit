"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export interface ShipHeroSettings {
  shiphero_connected?: boolean;
  shiphero_webhook_url?: string;
  shiphero_webhook_secret?: string;
  use_order_queue_processor?: boolean;
}

export interface ShipHeroCardProps {
  /** Current settings */
  settings: ShipHeroSettings | null;
  /** Loading state for settings */
  settingsLoading?: boolean;
  /** Callback to initiate OAuth flow */
  onOAuthFlow: () => Promise<void>;
  /** Callback to disconnect ShipHero */
  onDisconnect: () => Promise<void>;
  /** Callback to register webhook */
  onRegisterWebhook: () => Promise<void>;
  /** Callback to delete webhook */
  onDeleteWebhook: () => Promise<void>;
  /** Callback to update settings */
  onUpdateSettings: (settings: Partial<ShipHeroSettings>) => Promise<void>;
  /** OAuth success from URL params */
  oauthSuccess?: boolean;
  /** OAuth error from URL params */
  oauthError?: string;
}

export function ShipHeroLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_525_7263)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.91039 16.7C7.77367 16.7004 7.63718 16.6656 7.51472 16.5959L1.10921 12.9359C0.86516 12.7961 0.714844 12.5387 0.714844 12.26V4.93996C0.714844 4.8036 0.751775 4.67215 0.817646 4.55694L0.818726 4.55737L0.819456 4.55779C0.887445 4.43833 0.984928 4.33551 1.10921 4.26455L7.51472 0.604517C7.75856 0.465161 8.05897 0.465161 8.30281 0.604517L14.7088 4.26455C14.833 4.3355 14.9309 4.43851 14.9987 4.55853L15.0002 4.55767C15.0659 4.67245 15.1026 4.80347 15.1026 4.93983V12.2601C15.1026 12.5386 14.9521 12.796 14.7085 12.9355L8.3025 16.5956C8.18139 16.6648 8.04591 16.6996 7.91039 16.7Z"
          className="text-blue-600"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.55078 6.49479C2.55078 6.73849 2.7245 7.03732 2.93651 7.15928L9.49375 10.9242C9.70555 11.0458 9.70555 11.2456 9.49375 11.3676L8.29355 12.0569C8.08111 12.1785 7.73431 12.1785 7.52209 12.0569L2.93651 9.42319C2.7245 9.30186 2.55078 9.40126 2.55078 9.64475V11.2112C2.55078 11.4547 2.7245 11.7541 2.93651 11.8752L7.52209 14.5086C7.73431 14.6305 8.08154 14.6305 8.29355 14.5086L12.8791 11.8752C13.0914 11.7541 13.2646 11.4547 13.2646 11.2112V10.7056C13.2646 10.4615 13.0914 10.1624 12.8791 10.0409L6.3221 6.27594C6.10966 6.15398 6.10966 5.95476 6.32167 5.83322L7.52209 5.14367C7.73431 5.02171 8.08154 5.02171 8.29355 5.14367L12.8791 7.77678C13.0914 7.89832 13.2646 7.79871 13.2646 7.55501L13.2651 5.98921C13.2651 5.74551 13.0918 5.44647 12.8796 5.32493L8.29355 2.69119C8.08154 2.56965 7.73431 2.56965 7.52209 2.69119L2.93651 5.32493C2.7245 5.44647 2.55078 5.74551 2.55078 5.98921V6.49479Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_525_7263">
          <rect width="14.2857" height="16" fill="white" transform="translate(0.714844 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function WebhookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.46,19a4.59,4.59,0,0,1-6.37,1.15,4.63,4.63,0,0,1,2.49-8.38l0,1.43a3.17,3.17,0,0,0-2.36,1.36A3.13,3.13,0,0,0,5,18.91a3.11,3.11,0,0,0,4.31-.84,3.33,3.33,0,0,0,.56-1.44v-1l5.58,0,.07-.11a1.88,1.88,0,1,1,.67,2.59,1.77,1.77,0,0,1-.83-1l-4.07,0A5,5,0,0,1,10.46,19m7.28-7.14a4.55,4.55,0,1,1-1.12,9,4.63,4.63,0,0,1-3.43-2.21L14.43,18a3.22,3.22,0,0,0,2.32,1.45,3.05,3.05,0,1,0,.75-6.06,3.39,3.39,0,0,0-1.53.18l-.85.44L12.54,9.2h-.22a1.88,1.88,0,1,1,.13-3.76A1.93,1.93,0,0,1,14.3,7.39a1.88,1.88,0,0,1-.46,1.15l1.9,3.51a4.75,4.75,0,0,1,2-.19M8.25,9.14A4.54,4.54,0,1,1,16.62,5.6a4.61,4.61,0,0,1-.2,4.07L15.18,9a3.17,3.17,0,0,0,.09-2.73A3.05,3.05,0,1,0,9.65,8.6,3.21,3.21,0,0,0,11,10.11l.39.21-3.07,5a1.09,1.09,0,0,1,.1.19,1.88,1.88,0,1,1-2.56-.83,1.77,1.77,0,0,1,1.23-.17l2.31-3.77A4.41,4.41,0,0,1,8.25,9.14Z" />
    </svg>
  );
}

export function ShipHeroCard({
  settings,
  settingsLoading,
  onOAuthFlow,
  onDisconnect,
  onRegisterWebhook,
  onDeleteWebhook,
  onUpdateSettings,
  oauthSuccess,
  oauthError,
}: ShipHeroCardProps) {
  const [status, setStatus] = useState<"idle" | "connected" | "error">("idle");
  const [error, setError] = useState("");
  const [oauthLoading, setOauthLoading] = useState(false);
  const [isRegisteringWebhook, setIsRegisteringWebhook] = useState(false);
  const [isDeletingWebhook, setIsDeletingWebhook] = useState(false);

  // Update status based on settings
  useEffect(() => {
    if (settings) {
      setStatus(settings.shiphero_connected ? "connected" : "idle");
    }
  }, [settings]);

  // Handle OAuth callback responses
  useEffect(() => {
    if (oauthSuccess) {
      setStatus("connected");
    }
    if (oauthError) {
      setStatus("error");
      setError(oauthError);
    }
  }, [oauthSuccess, oauthError]);

  const handleOAuthFlow = async () => {
    setOauthLoading(true);
    setError("");
    try {
      await onOAuthFlow();
    } catch (err: any) {
      setError(err?.message || "Failed to initiate OAuth flow");
    }
    setOauthLoading(false);
  };

  const handleDisconnect = async () => {
    setOauthLoading(true);
    try {
      await onDisconnect();
      setStatus("idle");
    } catch (err: any) {
      console.error("Disconnect error:", err);
    }
    setOauthLoading(false);
  };

  const handleRegisterWebhook = async () => {
    setIsRegisteringWebhook(true);
    try {
      await onRegisterWebhook();
    } catch (err: any) {
      console.error("Webhook registration error:", err);
    }
    setIsRegisteringWebhook(false);
  };

  const handleDeleteWebhook = async () => {
    setIsDeletingWebhook(true);
    try {
      await onDeleteWebhook();
    } catch (err: any) {
      console.error("Webhook deletion error:", err);
    }
    setIsDeletingWebhook(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center">
            <ShipHeroLogo className="mr-2 h-5 w-5" />
            ShipHero
            {status === "connected" && (
              <Badge
                variant="secondary"
                className="ml-2 bg-green-50 text-green-700 hover:bg-green-50 px-2 py-0"
              >
                <Check className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Connect to ShipHero to sync orders, inventory, and shipping information
          </CardDescription>
        </div>
        {status === "connected" ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOAuthFlow}
              disabled={oauthLoading}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              {oauthLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reauthorize
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              disabled={oauthLoading}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleOAuthFlow}
            disabled={oauthLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {oauthLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Server className="mr-2 h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {status === "connected" && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">Auto-sync orders</span>
                <span className="text-xs text-muted-foreground">
                  Automatically import new orders from ShipHero
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">Use Order Queue Processor</span>
                <span className="text-xs text-muted-foreground">
                  Enable the new async order processing system (recommended for reliability)
                </span>
              </div>
              <Switch
                checked={!!settings?.use_order_queue_processor}
                onCheckedChange={async (checked) => {
                  await onUpdateSettings({ use_order_queue_processor: checked });
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">Sync inventory</span>
                <span className="text-xs text-muted-foreground">
                  Keep inventory levels in sync with ShipHero
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium">Update shipping status</span>
                <span className="text-xs text-muted-foreground">
                  Send shipping updates back to ShipHero
                </span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex flex-col">
                <span className="font-medium">Webhook Registration</span>
                <span className="text-xs text-muted-foreground">
                  Register webhook to receive real-time updates from ShipHero
                </span>
                {settings?.shiphero_webhook_url && (
                  <span className="text-xs text-muted-foreground mt-1">
                    Current webhook: {settings.shiphero_webhook_url}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                {settings?.shiphero_webhook_secret ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    disabled={isDeletingWebhook || !settings?.shiphero_connected}
                    onClick={handleDeleteWebhook}
                  >
                    {isDeletingWebhook ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Webhook"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isRegisteringWebhook || !settings?.shiphero_connected}
                    onClick={handleRegisterWebhook}
                    className="bg-white hover:bg-gray-50 border border-gray-200 text-black"
                  >
                    {isRegisteringWebhook ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <WebhookIcon className="mr-2 h-4 w-4" />
                        Register Webhook
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="text-xs text-muted-foreground">
          Last synced: {status === "connected" ? "Today at 10:30 AM" : "Never"}
        </div>
        <Button variant="outline" size="sm" disabled={status !== "connected"}>
          <RefreshCw className="mr-2 h-3 w-3" />
          Sync Now
        </Button>
      </CardFooter>
    </Card>
  );
}

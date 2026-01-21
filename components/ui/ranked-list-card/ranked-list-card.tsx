"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card"

export interface RankedListItem {
  /** Unique identifier for the item */
  id: string
  /** Display name/label for the item */
  name: string
  /** Value to display (e.g., count, score) */
  value: number
  /** Initials for avatar display */
  initials?: string
  /** Optional custom avatar color class */
  avatarColor?: string
}

export interface RankedListCardProps {
  /** Card title */
  title: string
  /** Card description/subtitle */
  description?: string
  /** Badge text (e.g., "Today", "This Week") */
  badgeText?: string
  /** Items to display in the ranked list */
  items: RankedListItem[]
  /** Label for the value (e.g., "items", "points", "sales") */
  valueLabel?: string
  /** Whether data is loading */
  isLoading?: boolean
  /** Loading message */
  loadingMessage?: string
  /** Empty state icon */
  emptyIcon?: React.ReactNode
  /** Empty state message */
  emptyMessage?: string
  /** Whether to show rank medals (gold, silver, bronze) */
  showRankMedals?: boolean
  /** Whether to show avatars */
  showAvatars?: boolean
  /** Custom render function for each item */
  renderItem?: (item: RankedListItem, index: number) => React.ReactNode
  /** Additional className for the card */
  className?: string
}

const DEFAULT_AVATAR_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-yellow-500",
]

function getAvatarColor(initials: string): string {
  const index = initials.charCodeAt(0) % DEFAULT_AVATAR_COLORS.length
  return DEFAULT_AVATAR_COLORS[index]
}

function getRankIcon(index: number): string {
  if (index === 0) return "\u{1F947}" // gold medal
  if (index === 1) return "\u{1F948}" // silver medal
  if (index === 2) return "\u{1F949}" // bronze medal
  return ""
}

/**
 * A reusable ranked list card component for displaying leaderboards,
 * top performers, rankings, etc.
 *
 * @example
 * <RankedListCard
 *   title="Top Performers"
 *   description="Best sellers this month"
 *   badgeText="This Month"
 *   items={[
 *     { id: "1", name: "John Doe", value: 150, initials: "JD" },
 *     { id: "2", name: "Jane Smith", value: 120, initials: "JS" },
 *   ]}
 *   valueLabel="sales"
 *   showRankMedals
 *   showAvatars
 * />
 */
export function RankedListCard({
  title,
  description,
  badgeText,
  items,
  valueLabel = "items",
  isLoading = false,
  loadingMessage = "Loading data...",
  emptyIcon,
  emptyMessage = "No data available",
  showRankMedals = true,
  showAvatars = true,
  renderItem,
  className,
}: RankedListCardProps) {
  const defaultRenderItem = (item: RankedListItem, index: number) => (
    <div
      key={item.id}
      className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Rank Medal */}
        {showRankMedals && (
          <span className="text-xl sm:text-2xl flex-shrink-0">{getRankIcon(index)}</span>
        )}

        {/* Avatar */}
        {showAvatars && item.initials && (
          <div
            className={cn(
              "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0",
              item.avatarColor || getAvatarColor(item.initials)
            )}
          >
            {item.initials}
          </div>
        )}

        {/* Name */}
        <span className="font-medium text-gray-900 text-sm sm:text-base truncate">
          {item.name}
        </span>
      </div>

      {/* Value Badge */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <span className="text-xl sm:text-2xl font-bold text-gray-900">{item.value}</span>
        <span className="text-xs sm:text-sm text-gray-500">{valueLabel}</span>
      </div>
    </div>
  )

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
            )}
          </div>
          {badgeText && (
            <div className="px-3 py-1 bg-slate-100 rounded-md self-start sm:self-auto">
              <span className="text-xs sm:text-sm font-medium text-slate-700">{badgeText}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-4 sm:p-8">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400 mb-2" />
            <span className="text-xs sm:text-sm text-slate-500">{loadingMessage}</span>
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {items.map((item, index) =>
              renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 sm:p-8">
            {emptyIcon && <div className="mb-2">{emptyIcon}</div>}
            <p className="text-xs sm:text-sm text-slate-500">{emptyMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RankedListCard

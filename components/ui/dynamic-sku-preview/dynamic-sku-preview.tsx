"use client"

import * as React from "react"

import { cn } from "../../../lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../card"
import { Badge } from "../badge"
import { Skeleton } from "../skeleton"

interface SkuVariant {
  id: string
  name: string
  value: string
  price?: number
  available?: boolean
}

interface DynamicSkuPreviewProps {
  sku: string
  variants?: SkuVariant[]
  basePrice?: number
  currency?: string
  imageUrl?: string
  title?: string
  description?: string
  loading?: boolean
  onVariantSelect?: (variant: SkuVariant) => void
  selectedVariantId?: string
  className?: string
}

function DynamicSkuPreview({
  sku,
  variants = [],
  basePrice,
  currency = "USD",
  imageUrl,
  title,
  description,
  loading = false,
  onVariantSelect,
  selectedVariantId,
  className,
}: DynamicSkuPreviewProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price)
  }

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title || "Product Preview"}</CardTitle>
          <Badge variant="secondary" className="font-mono text-xs">
            {sku}
          </Badge>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
            <img
              src={imageUrl}
              alt={title || "Product preview"}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {basePrice !== undefined && (
          <div className="text-2xl font-bold">{formatPrice(basePrice)}</div>
        )}

        {variants.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Variants</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <Badge
                  key={variant.id}
                  variant={
                    selectedVariantId === variant.id ? "default" : "outline"
                  }
                  className={cn(
                    "cursor-pointer transition-colors",
                    !variant.available && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (variant.available !== false && onVariantSelect) {
                      onVariantSelect(variant)
                    }
                  }}
                >
                  {variant.name}: {variant.value}
                  {variant.price !== undefined && (
                    <span className="ml-1 text-xs">
                      (+{formatPrice(variant.price)})
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { DynamicSkuPreview }
export type { DynamicSkuPreviewProps, SkuVariant }

"use client"

import * as React from "react"
import { ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface GenericDesignPreviewProps {
  imageUrl?: string
  title?: string
  description?: string
  loading?: boolean
  error?: string
  showControls?: boolean
  onDownload?: () => void
  onZoomIn?: () => void
  onZoomOut?: () => void
  onReset?: () => void
  minZoom?: number
  maxZoom?: number
  className?: string
  children?: React.ReactNode
}

function GenericDesignPreview({
  imageUrl,
  title,
  description,
  loading = false,
  error,
  showControls = true,
  onDownload,
  onZoomIn,
  onZoomOut,
  onReset,
  minZoom = 0.5,
  maxZoom = 3,
  className,
  children,
}: GenericDesignPreviewProps) {
  const [zoom, setZoom] = React.useState(1)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 0.25, maxZoom)
    setZoom(newZoom)
    onZoomIn?.()
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 0.25, minZoom)
    setZoom(newZoom)
    onZoomOut?.()
  }

  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    onReset?.()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        {title && (
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
        )}
        <CardContent>
          <Skeleton className="aspect-square w-full" />
        </CardContent>
        {showControls && (
          <CardFooter>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </CardFooter>
        )}
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div
          ref={containerRef}
          className={cn(
            "relative aspect-square w-full overflow-hidden rounded-md bg-muted",
            zoom > 1 && "cursor-grab",
            isDragging && "cursor-grabbing"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Design preview"}
              className="h-full w-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
              draggable={false}
            />
          ) : children ? (
            <div
              className="h-full w-full transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
            >
              {children}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No preview available</p>
            </div>
          )}
        </div>
      </CardContent>
      {showControls && (
        <CardFooter className="justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= minZoom}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= maxZoom}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
            {onDownload && (
              <Button variant="outline" size="icon" onClick={onDownload}>
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export { GenericDesignPreview }
export type { GenericDesignPreviewProps }

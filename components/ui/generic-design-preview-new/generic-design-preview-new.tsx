"use client"

import * as React from "react"
import { ZoomIn, ZoomOut, RotateCcw, Download, Maximize2, Minimize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GenericDesignPreviewNewProps {
  imageUrl?: string
  title?: string
  loading?: boolean
  error?: string
  showControls?: boolean
  showZoomSlider?: boolean
  onDownload?: () => void
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  aspectRatio?: "square" | "video" | "portrait" | "auto"
  className?: string
  children?: React.ReactNode
}

function GenericDesignPreviewNew({
  imageUrl,
  title,
  loading = false,
  error,
  showControls = true,
  showZoomSlider = false,
  onDownload,
  minZoom = 0.5,
  maxZoom = 3,
  defaultZoom = 1,
  aspectRatio = "square",
  className,
  children,
}: GenericDesignPreviewNewProps) {
  const [zoom, setZoom] = React.useState(defaultZoom)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, maxZoom))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, minZoom))
  }

  const handleReset = () => {
    setZoom(defaultZoom)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
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
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.min(Math.max(prev + delta, minZoom), maxZoom))
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  if (loading) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        <Skeleton className={cn("w-full", aspectRatioClass[aspectRatio] || "h-64")} />
        {showControls && (
          <div className="flex justify-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "flex items-center justify-center rounded-lg border border-dashed bg-muted/50",
            aspectRatioClass[aspectRatio] || "h-64"
          )}
        >
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className={cn("w-full space-y-2", className)}>
        <div
          ref={containerRef}
          className={cn(
            "relative w-full overflow-hidden rounded-lg border bg-muted/50",
            aspectRatioClass[aspectRatio] || "h-64",
            zoom > 1 && "cursor-grab",
            isDragging && "cursor-grabbing",
            isFullscreen && "!h-screen !w-screen rounded-none"
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
              className="h-full w-full object-contain transition-transform duration-100"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
              draggable={false}
            />
          ) : children ? (
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-100"
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

          {showControls && isFullscreen && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-background/95 p-2 shadow-lg backdrop-blur">
              <ControlButtons
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
                onDownload={onDownload}
                onToggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
              />
            </div>
          )}
        </div>

        {showControls && !isFullscreen && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ControlButtons
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
                onDownload={onDownload}
                onToggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
              />
            </div>

            {showZoomSlider && (
              <div className="flex w-32 items-center gap-2">
                <Slider
                  value={[zoom]}
                  min={minZoom}
                  max={maxZoom}
                  step={0.1}
                  onValueChange={handleZoomChange}
                />
                <span className="w-12 text-right text-xs text-muted-foreground">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

interface ControlButtonsProps {
  zoom: number
  minZoom: number
  maxZoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onDownload?: () => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
}

function ControlButtons({
  zoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onDownload,
  onToggleFullscreen,
  isFullscreen,
}: ControlButtonsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onZoomOut}
            disabled={zoom <= minZoom}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zoom out</TooltipContent>
      </Tooltip>

      <span className="min-w-[3rem] text-center text-xs text-muted-foreground">
        {Math.round(zoom * 100)}%
      </span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onZoomIn}
            disabled={zoom >= maxZoom}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zoom in</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reset view</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</TooltipContent>
      </Tooltip>

      {onDownload && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>
      )}
    </>
  )
}

export { GenericDesignPreviewNew }
export type { GenericDesignPreviewNewProps }

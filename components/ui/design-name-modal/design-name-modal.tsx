"use client"

import * as React from "react"

import { cn } from "../../../lib/utils"
import { Button } from "../button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog"
import { Input } from "../input"
import { Label } from "../label"

interface DesignNameModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string) => void
  defaultName?: string
  title?: string
  description?: string
  submitLabel?: string
  cancelLabel?: string
  placeholder?: string
  className?: string
}

function DesignNameModal({
  open,
  onOpenChange,
  onSubmit,
  defaultName = "",
  title = "Name Your Design",
  description = "Enter a name for your design to save it.",
  submitLabel = "Save",
  cancelLabel = "Cancel",
  placeholder = "Enter design name...",
  className,
}: DesignNameModalProps) {
  const [name, setName] = React.useState(defaultName)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open) {
      setName(defaultName)
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }, [open, defaultName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="design-name">Design Name</Label>
              <Input
                ref={inputRef}
                id="design-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { DesignNameModal }
export type { DesignNameModalProps }

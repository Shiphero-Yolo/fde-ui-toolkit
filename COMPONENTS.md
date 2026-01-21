# FDE UI Toolkit - Components Index

**Commit:** `c8b3c7436c0aaf1f0e8157aa6e7838f842419f64`
**Date:** 2026-01-21
**Framework:** Next.js 16.1.4, React 19, Tailwind CSS v4, Radix UI

---

## Quick Reference

All components are exported from `@/components/ui` and can be imported as:

```tsx
import { Button, Card, Input, ... } from "@/components/ui"
```

Hooks are exported from `@/hooks`:

```tsx
import { useMobile, useToast } from "@/hooks"
```

---

## Components by Category

### Core / Layout

| Component | Path | Exports |
|-----------|------|---------|
| **Button** | `components/ui/button/` | `Button`, `buttonVariants` |
| **Card** | `components/ui/card/` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| **Separator** | `components/ui/separator/` | `Separator` |
| **Skeleton** | `components/ui/skeleton/` | `Skeleton` |
| **AspectRatio** | `components/ui/aspect-ratio/` | `AspectRatio` |
| **ScrollArea** | `components/ui/scroll-area/` | `ScrollArea`, `ScrollBar` |
| **Resizable** | `components/ui/resizable/` | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` |
| **Sidebar** | `components/ui/sidebar/` | `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarProvider`, `SidebarTrigger`, `SidebarInset`, `useSidebar` |

### Typography

| Component | Path | Exports |
|-----------|------|---------|
| **Typography** | `components/ui/typography/` | `Title`, `Subtitle`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `Body`, `BodySmall`, `Caption`, `Overline`, `Lead`, `InlineCode`, `Blockquote`, `Muted` |

### Form Controls

| Component | Path | Exports |
|-----------|------|---------|
| **Input** | `components/ui/input/` | `Input` |
| **Textarea** | `components/ui/textarea/` | `Textarea` |
| **Label** | `components/ui/label/` | `Label` |
| **Checkbox** | `components/ui/checkbox/` | `Checkbox` |
| **Switch** | `components/ui/switch/` | `Switch` |
| **RadioGroup** | `components/ui/radio-group/` | `RadioGroup`, `RadioGroupItem` |
| **Select** | `components/ui/select/` | `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator` |
| **Slider** | `components/ui/slider/` | `Slider` |
| **Toggle** | `components/ui/toggle/` | `Toggle`, `toggleVariants` |
| **ToggleGroup** | `components/ui/toggle-group/` | `ToggleGroup`, `ToggleGroupItem` |
| **Calendar** | `components/ui/calendar/` | `Calendar` |
| **InputOTP** | `components/ui/input-otp/` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` |
| **Form** | `components/ui/form/` | `Form`, `FormControl`, `FormDescription`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`, `useFormField` |

### Data Display

| Component | Path | Exports |
|-----------|------|---------|
| **Badge** | `components/ui/badge/` | `Badge`, `badgeVariants` |
| **Avatar** | `components/ui/avatar/` | `Avatar`, `AvatarImage`, `AvatarFallback` |
| **Table** | `components/ui/table/` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption` |
| **Chart** | `components/ui/chart/` | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle`, `ChartConfig` |
| **Progress** | `components/ui/progress/` | `Progress` |

### Navigation

| Component | Path | Exports |
|-----------|------|---------|
| **Breadcrumb** | `components/ui/breadcrumb/` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` |
| **Pagination** | `components/ui/pagination/` | `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` |
| **Tabs** | `components/ui/tabs/` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| **NavigationMenu** | `components/ui/navigation-menu/` | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`, `navigationMenuTriggerStyle` |
| **Menubar** | `components/ui/menubar/` | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarLabel`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarShortcut` |

### Overlays / Modals

| Component | Path | Exports |
|-----------|------|---------|
| **Dialog** | `components/ui/dialog/` | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogTrigger`, `DialogClose` |
| **AlertDialog** | `components/ui/alert-dialog/` | `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogTrigger` |
| **Sheet** | `components/ui/sheet/` | `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetTrigger`, `SheetClose` |
| **Drawer** | `components/ui/drawer/` | `Drawer`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerTrigger`, `DrawerClose` |
| **Popover** | `components/ui/popover/` | `Popover`, `PopoverContent`, `PopoverTrigger` |
| **Tooltip** | `components/ui/tooltip/` | `Tooltip`, `TooltipContent`, `TooltipTrigger`, `TooltipProvider` |
| **HoverCard** | `components/ui/hover-card/` | `HoverCard`, `HoverCardContent`, `HoverCardTrigger` |

### Menus

| Component | Path | Exports |
|-----------|------|---------|
| **DropdownMenu** | `components/ui/dropdown-menu/` | `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuTrigger`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuShortcut` |
| **ContextMenu** | `components/ui/context-menu/` | `ContextMenu`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuTrigger`, `ContextMenuSeparator`, `ContextMenuLabel`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuShortcut` |
| **Command** | `components/ui/command/` | `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`, `CommandDialog` |

### Disclosure

| Component | Path | Exports |
|-----------|------|---------|
| **Accordion** | `components/ui/accordion/` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| **Collapsible** | `components/ui/collapsible/` | `Collapsible`, `CollapsibleContent`, `CollapsibleTrigger` |

### Feedback

| Component | Path | Exports |
|-----------|------|---------|
| **Alert** | `components/ui/alert/` | `Alert`, `AlertTitle`, `AlertDescription` |
| **Toast** | `components/ui/toast/` | `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastProvider`, `ToastTitle`, `ToastViewport`, `Toaster` |
| **Sonner** | `components/ui/sonner/` | `SonnerToaster`, `SonnerToasterProps` |

### Media

| Component | Path | Exports |
|-----------|------|---------|
| **Carousel** | `components/ui/carousel/` | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` |

### Custom / Domain-Specific

| Component | Path | Description |
|-----------|------|-------------|
| **DesignNameModal** | `components/ui/design-name-modal/` | Modal for naming designs |
| **DynamicSkuPreview** | `components/ui/dynamic-sku-preview/` | SKU preview component |
| **GenericDesignPreview** | `components/ui/generic-design-preview/` | Generic design preview |
| **GenericDesignPreviewNew** | `components/ui/generic-design-preview-new/` | Updated design preview |

---

## Hooks

| Hook | Path | Description |
|------|------|-------------|
| **useMobile** | `hooks/use-mobile.ts` | Detects mobile viewport |
| **useToast** | `hooks/use-toast.ts` | Toast notification management |

---

## Dependencies

### Radix UI Primitives
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-label`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`
- `@radix-ui/react-separator`
- `@radix-ui/react-slider`
- `@radix-ui/react-slot`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-toast`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`
- `@radix-ui/react-tooltip`

### Other Libraries
- `cmdk` - Command palette
- `embla-carousel-react` - Carousel
- `input-otp` - OTP input
- `react-day-picker` - Calendar
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `react-resizable-panels` - Resizable panels
- `recharts` - Charts
- `sonner` - Toast notifications
- `vaul` - Drawer
- `next-themes` - Theme management
- `class-variance-authority` - Variant styling
- `clsx` + `tailwind-merge` - Class utilities

---

## File Structure

```
components/
└── ui/
    ├── index.ts              # Main barrel export
    ├── accordion/
    │   ├── accordion.tsx
    │   └── index.ts
    ├── alert/
    │   ├── alert.tsx
    │   └── index.ts
    ├── ... (same pattern for all components)
    └── typography/
        ├── typography.tsx
        └── index.ts

hooks/
├── index.ts
├── use-mobile.ts
└── use-toast.ts

lib/
└── utils.ts                  # cn() utility function
```

---

## Usage Examples

### Basic Import
```tsx
import { Button, Card, CardContent, Input } from "@/components/ui"

export function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

### With Form Validation
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({ email: z.string().email() })

export function MyForm() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
```

### Table with Features
The Table component supports:
- Sorting (click column headers)
- Filtering (via Select/Input)
- Search (via Input)
- Pagination (via Pagination component)

See `app/page.tsx` for full implementation example.

---

## Styling

All components use Tailwind CSS with CSS variables for theming:

```css
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring
--radius
```

The `cn()` utility from `@/lib/utils` combines `clsx` and `tailwind-merge` for conditional classes.

---

## Notes for AI Assistants

1. **Import Pattern**: Always import from `@/components/ui` (barrel export)
2. **Composable**: Most components follow compound component pattern (e.g., `Card` + `CardContent`)
3. **Radix-based**: Accessibility and keyboard navigation built-in
4. **Variants**: Use `variant` and `size` props where available
5. **Refs**: All components forward refs properly
6. **TypeScript**: Full type support with exported types

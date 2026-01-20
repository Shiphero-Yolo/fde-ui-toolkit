# FDE-UI-TOOLKIT

A comprehensive, reusable React component library built with Radix UI, Tailwind CSS, and TypeScript.

## Quick Reference for Opus 4.5

### Installation

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-checkbox
npm install @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-label
npm install @radix-ui/react-switch @radix-ui/react-separator @radix-ui/react-avatar
npm install @radix-ui/react-tooltip @radix-ui/react-progress @radix-ui/react-radio-group
npm install @radix-ui/react-popover
```

### Project Structure

```
fde-ui-toolkit/
├── app/
│   ├── globals.css          # MANDATORY color palette
│   ├── layout.tsx
│   └── page.tsx              # Showcase page
├── components/
│   └── ui/
│       ├── button/           # Each component in its own folder
│       │   ├── button.tsx
│       │   └── index.ts
│       ├── card/
│       ├── input/
│       ├── ... (other components)
│       └── index.ts          # Main export file
└── lib/
    └── utils.ts              # cn() utility function
```

---

## MANDATORY Color Palette

The color palette is defined in `app/globals.css` using CSS variables. **These colors MUST be used by all components.**

### Light Mode Colors

| Variable | HSL Value | Usage |
|----------|-----------|-------|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `0 0% 3.9%` | Text color |
| `--primary` | `0 0% 9%` | Primary buttons, links |
| `--primary-foreground` | `0 0% 98%` | Text on primary |
| `--secondary` | `0 0% 96.1%` | Secondary buttons |
| `--secondary-foreground` | `0 0% 9%` | Text on secondary |
| `--muted` | `0 0% 96.1%` | Muted backgrounds |
| `--muted-foreground` | `0 0% 45.1%` | Muted text |
| `--accent` | `0 0% 96.1%` | Hover states |
| `--accent-foreground` | `0 0% 9%` | Text on accent |
| `--destructive` | `0 84.2% 60.2%` | Error/danger |
| `--destructive-foreground` | `0 0% 98%` | Text on destructive |
| `--border` | `0 0% 89.8%` | Borders |
| `--input` | `0 0% 89.8%` | Input borders |
| `--ring` | `0 0% 3.9%` | Focus rings |
| `--card` | `0 0% 100%` | Card background |
| `--card-foreground` | `0 0% 3.9%` | Card text |
| `--popover` | `0 0% 100%` | Popover background |
| `--popover-foreground` | `0 0% 3.9%` | Popover text |

### Chart Colors

| Variable | HSL Value |
|----------|-----------|
| `--chart-1` | `12 76% 61%` |
| `--chart-2` | `173 58% 39%` |
| `--chart-3` | `197 37% 24%` |
| `--chart-4` | `43 74% 66%` |
| `--chart-5` | `27 87% 67%` |

### Usage in Tailwind

```tsx
// Use colors directly in classes
<div className="bg-background text-foreground" />
<button className="bg-primary text-primary-foreground" />
<span className="text-muted-foreground" />
<div className="border-destructive" />
```

---

## Utility Function

Location: `lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Components Reference

### Button

Location: `components/ui/button/button.tsx`

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// As child (polymorphic)
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

**Props:**
- `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`
- `size`: `"default" | "sm" | "lg" | "icon"`
- `asChild`: `boolean` - Render as child element

---

### Card

Location: `components/ui/card/card.tsx`

```tsx
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Input

Location: `components/ui/input/input.tsx`

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled" />
```

---

### Textarea

Location: `components/ui/textarea/textarea.tsx`

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter your message..." />
<Textarea rows={5} />
```

---

### Label

Location: `components/ui/label/label.tsx`

```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

---

### Badge

Location: `components/ui/badge/badge.tsx`

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

**Props:**
- `variant`: `"default" | "secondary" | "destructive" | "outline"`

---

### Checkbox

Location: `components/ui/checkbox/checkbox.tsx`

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Controlled
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

---

### Switch

Location: `components/ui/switch/switch.tsx`

```tsx
import { Switch } from "@/components/ui/switch"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// Controlled
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

---

### Radio Group

Location: `components/ui/radio-group/radio-group.tsx`

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-1" id="option-1" />
    <Label htmlFor="option-1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-2" id="option-2" />
    <Label htmlFor="option-2">Option 2</Label>
  </div>
</RadioGroup>
```

---

### Select

Location: `components/ui/select/select.tsx`

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

### Dialog

Location: `components/ui/dialog/dialog.tsx`

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text</DialogDescription>
    </DialogHeader>
    <div>Content here</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Popover

Location: `components/ui/popover/popover.tsx`

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content here</p>
  </PopoverContent>
</Popover>
```

---

### Tooltip

Location: `components/ui/tooltip/tooltip.tsx`

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Wrap your app with TooltipProvider
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Tabs

Location: `components/ui/tabs/tabs.tsx`

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content</p>
  </TabsContent>
</Tabs>
```

---

### Alert

Location: `components/ui/alert/alert.tsx`

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

**Props:**
- `variant`: `"default" | "destructive"`

---

### Progress

Location: `components/ui/progress/progress.tsx`

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={33} />
<Progress value={66} className="w-[60%]" />
```

**Props:**
- `value`: `number` (0-100)

---

### Separator

Location: `components/ui/separator/separator.tsx`

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

**Props:**
- `orientation`: `"horizontal" | "vertical"`

---

### Skeleton

Location: `components/ui/skeleton/skeleton.tsx`

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-12 w-12 rounded-full" />
```

---

### Avatar

Location: `components/ui/avatar/avatar.tsx`

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

## Import All Components

```tsx
// Import everything from the main index
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Label,
  Badge,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Separator,
  Skeleton,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui"
```

---

## Adding New Components

1. Create a new folder in `components/ui/`
2. Create the component file (e.g., `my-component.tsx`)
3. Create an `index.ts` that exports the component
4. Add export to `components/ui/index.ts`
5. **IMPORTANT**: Use only colors from the mandatory palette

---

## Color Palette Enforcement

When creating or modifying components, always use the semantic color variables:

```tsx
// CORRECT - Using palette colors
className="bg-primary text-primary-foreground"
className="border-input"
className="text-muted-foreground"
className="focus:ring-ring"

// INCORRECT - Using hardcoded colors
className="bg-black text-white"
className="border-gray-300"
className="text-gray-500"
```

This ensures consistent theming and dark mode support across all components.

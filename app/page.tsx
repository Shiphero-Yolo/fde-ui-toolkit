"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import { animate } from "animejs"
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
  Title,
  Subtitle,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  BodySmall,
  Caption,
  Overline,
  Lead,
  InlineCode,
  Blockquote,
  Muted,
  // New components
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Calendar,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Slider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  CollapsibleSidebar,
  SettingsPage,
  SettingsCard,
  ShipHeroCard,
  LoginPage,
  RankedListCard,
} from "@/components/ui"
import { AlertCircle, CheckCircle2, Copy, Check, Sun, Moon, ChevronDown, ChevronsUpDown, Bold, Italic, Underline, Calendar as CalendarIcon, Home, Settings, User, Mail, Plus, Minus, Search, ArrowUpDown, ArrowUp, ArrowDown, LayoutDashboard, Package, ShoppingCart, BarChart3, Bell, HelpCircle, LogOut, ChevronUp, PanelLeftClose, PanelLeft, Palette, Type, MousePointer, FormInput, LayoutList, Layers, MessageSquare, Grid3X3, Image as ImageIcon, SlidersHorizontal, Tag, LogIn, Trophy } from "lucide-react"
import Image from "next/image"
import { z } from "zod"

// Animated section component with entrance animation
function AnimatedSection({ children, className = "", delay = 0, id }: { children: ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial state
    element.style.opacity = "0"
    element.style.transform = "translateY(24px)"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animate(element, {
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 600,
              delay,
              ease: "outCubic",
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}

// Hook for button press animation
function useButtonAnimation() {
  const animatePress = (element: HTMLElement) => {
    animate(element, {
      scale: [1, 0.95, 1],
      duration: 200,
      ease: "inOutQuad",
    })
  }
  return animatePress
}

// Slipspace Logo component with hover animation
function SlipspaceLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLImageElement>(null)
  const streaksRef = useRef<HTMLDivElement>(null)
  const bgCircleRef = useRef<HTMLDivElement>(null)
  const spaceRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)
  const isHovering = useRef(false)
  const animationFrame = useRef<number | null>(null)

  useEffect(() => {
    if (planeRef.current && bgCircleRef.current && !hasInitialized.current) {
      hasInitialized.current = true
      animate(bgCircleRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        ease: "outCubic",
      })
      animate(planeRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        ease: "outCubic",
      })
    }
  }, [])

  const createStreak = () => {
    if (!streaksRef.current || !isHovering.current) return

    const streak = document.createElement('div')
    const xPos = 5 + Math.random() * 90
    const width = 1 + Math.random() * 2.5
    const height = 20 + Math.random() * 30
    const duration = 200 + Math.random() * 100
    const maxOpacity = 0.4 + Math.random() * 0.6

    Object.assign(streak.style, {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      left: `${xPos}%`,
      top: '0px',
      borderRadius: '2px',
      backgroundColor: 'white',
      boxShadow: '0 0 6px rgba(255,255,255,0.9)',
      opacity: '0',
      transform: 'translateY(0)',
      transition: `transform ${duration}ms linear, opacity 150ms ease-out`,
    })

    streak.dataset.maxOpacity = String(maxOpacity)

    streaksRef.current.appendChild(streak)

    // Fade in and start moving
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        streak.style.opacity = String(maxOpacity)
        streak.style.transform = 'translateY(120px)'
      })
    })

    // Fade out near the end
    setTimeout(() => {
      streak.style.transition = `transform ${duration}ms linear, opacity 100ms ease-in`
      streak.style.opacity = '0'
    }, duration - 100)

    // Remove after animation
    setTimeout(() => {
      if (streak.parentNode) {
        streak.remove()
      }
    }, duration + 50)
  }

  const startStreaks = () => {
    if (!isHovering.current) return

    // Create multiple streaks
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createStreak(), i * 50)
    }

    // Schedule next batch
    animationFrame.current = window.setTimeout(startStreaks, 150)
  }

  const handleMouseEnter = () => {
    if (!planeRef.current || !spaceRef.current) return
    isHovering.current = true

    // Space background fades in
    animate(spaceRef.current, {
      opacity: [0, 1],
      duration: 250,
      ease: "outQuad",
    })

    // Plane moves up
    animate(planeRef.current, {
      translateY: [0, -3],
      duration: 300,
      ease: "inOutQuad",
    })

    // Start streaks
    startStreaks()
  }

  const handleMouseLeave = () => {
    if (!planeRef.current || !spaceRef.current) return
    isHovering.current = false

    // Stop creating new streaks
    if (animationFrame.current) {
      clearTimeout(animationFrame.current)
      animationFrame.current = null
    }

    // Plane returns to original position
    animate(planeRef.current, {
      translateY: [-3, 0],
      duration: 300,
      ease: "outCubic",
    })

    // Fade out space background
    animate(spaceRef.current, {
      opacity: [1, 0],
      duration: 300,
      ease: "inQuad",
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center mb-4 cursor-pointer"
      style={{ width: 120, height: 120, margin: '0 auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grey background circle (static) */}
      <div
        ref={bgCircleRef}
        className="absolute rounded-full opacity-0"
        style={{
          width: 112,
          height: 112,
          background: '#fafafa',
          border: '1px solid #e5e5e5',
        }}
      />

      {/* Space background - dark circle (fades in on hover) */}
      <div
        ref={spaceRef}
        className="absolute rounded-full"
        style={{
          width: 112,
          height: 112,
          background: 'radial-gradient(circle, #1a1a2e 0%, #0d0d1a 50%, #050510 100%)',
          opacity: 0,
          zIndex: 1,
        }}
      />

      {/* Slipspace streaks container - clipped to circle */}
      <div
        ref={streaksRef}
        className="pointer-events-none"
        style={{
          position: 'absolute',
          width: 112,
          height: 112,
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 2,
        }}
      />

      {/* Plane only (moves independently) */}
      <Image
        ref={planeRef}
        src="/plane.svg"
        alt="Skunkworks UI Logo"
        width={120}
        height={120}
        className="opacity-0"
        style={{ position: 'relative', zIndex: 3 }}
      />
    </div>
  )
}

const colorPalette = [
  { name: "Primary", className: "bg-primary", hex: "#171717" },
  { name: "Secondary", className: "bg-secondary", hex: "#F5F5F5" },
  { name: "Destructive", className: "bg-destructive", hex: "#EF4444" },
  { name: "Muted", className: "bg-muted", hex: "#F5F5F5" },
  { name: "Accent", className: "bg-accent", hex: "#F5F5F5" },
  { name: "Card", className: "bg-card border-2 border-border", hex: "#FFFFFF" },
]

function ColorSwatch({ name, className, hex }: { name: string; className: string; hex: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-2">
      <div
        className={`h-16 rounded-md ${className} relative group`}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/20 rounded-md">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 text-xs gap-1 cursor-pointer"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : hex}
          </Button>
        </div>
      </div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  )
}

// Zod schema for form validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function Showcase() {
  const [switchEnabled, setSwitchEnabled] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [progress, setProgress] = useState(33)
  const [isDark, setIsDark] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState([50])
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [otpValue, setOtpValue] = useState("")

  // Table state
  const [tableSearch, setTableSearch] = useState("")
  const [tableStatusFilter, setTableStatusFilter] = useState<string>("all")
  const [tableSortColumn, setTableSortColumn] = useState<string | null>(null)
  const [tableSortDirection, setTableSortDirection] = useState<"asc" | "desc">("asc")
  const [tableCurrentPage, setTableCurrentPage] = useState(1)
  const tableItemsPerPage = 5

  // Navigation state
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [sideMenuOpen, setSideMenuOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("color-palette")
  const [componentsExpanded, setComponentsExpanded] = useState(true)
  const [layoutsExpanded, setLayoutsExpanded] = useState(true)
  const [isScrollingTo, setIsScrollingTo] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("components")

  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const animateButton = useButtonAnimation()

  // Basic validation state
  const [basicEmail, setBasicEmail] = useState("")
  const [basicEmailError, setBasicEmailError] = useState("")
  const [basicEmailSuccess, setBasicEmailSuccess] = useState(false)

  // Zod validation state
  const [zodEmail, setZodEmail] = useState("")
  const [zodPassword, setZodPassword] = useState("")
  const [zodErrors, setZodErrors] = useState<{ email?: string; password?: string }>({})
  const [zodSuccess, setZodSuccess] = useState(false)

  // Basic email validation
  const validateBasicEmail = (value: string) => {
    setBasicEmail(value)
    setBasicEmailSuccess(false)
    if (!value) {
      setBasicEmailError("")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setBasicEmailError("Please enter a valid email address")
    } else {
      setBasicEmailError("")
      setBasicEmailSuccess(true)
    }
  }

  // Zod validation
  const validateZodForm = () => {
    const result = formSchema.safeParse({ email: zodEmail, password: zodPassword })
    if (!result.success) {
      const errors: { email?: string; password?: string } = {}
      const fieldErrors = result.error.flatten().fieldErrors
      if (fieldErrors.email?.[0]) errors.email = fieldErrors.email[0]
      if (fieldErrors.password?.[0]) errors.password = fieldErrors.password[0]
      setZodErrors(errors)
      setZodSuccess(false)
    } else {
      setZodErrors({})
      setZodSuccess(true)
    }
  }

  // Invoice data for table
  const invoiceData = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: 250.00 },
    { id: "INV002", status: "Pending", method: "PayPal", amount: 150.00 },
    { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: 350.00 },
    { id: "INV004", status: "Paid", method: "Credit Card", amount: 450.00 },
    { id: "INV005", status: "Paid", method: "PayPal", amount: 550.00 },
    { id: "INV006", status: "Pending", method: "Bank Transfer", amount: 200.00 },
    { id: "INV007", status: "Unpaid", method: "Credit Card", amount: 175.00 },
    { id: "INV008", status: "Paid", method: "PayPal", amount: 325.00 },
    { id: "INV009", status: "Pending", method: "Credit Card", amount: 425.00 },
    { id: "INV010", status: "Paid", method: "Bank Transfer", amount: 275.00 },
    { id: "INV011", status: "Unpaid", method: "PayPal", amount: 125.00 },
    { id: "INV012", status: "Paid", method: "Credit Card", amount: 600.00 },
  ]

  // Filter and sort invoices
  const filteredInvoices = invoiceData
    .filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
        invoice.method.toLowerCase().includes(tableSearch.toLowerCase()) ||
        invoice.status.toLowerCase().includes(tableSearch.toLowerCase())
      const matchesStatus = tableStatusFilter === "all" || invoice.status === tableStatusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (!tableSortColumn) return 0
      let aValue: string | number = a[tableSortColumn as keyof typeof a]
      let bValue: string | number = b[tableSortColumn as keyof typeof b]
      if (typeof aValue === "string") aValue = aValue.toLowerCase()
      if (typeof bValue === "string") bValue = bValue.toLowerCase()
      if (aValue < bValue) return tableSortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return tableSortDirection === "asc" ? 1 : -1
      return 0
    })

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / tableItemsPerPage)
  const paginatedInvoices = filteredInvoices.slice(
    (tableCurrentPage - 1) * tableItemsPerPage,
    tableCurrentPage * tableItemsPerPage
  )

  const handleSort = (column: string) => {
    if (tableSortColumn === column) {
      setTableSortDirection(tableSortDirection === "asc" ? "desc" : "asc")
    } else {
      setTableSortColumn(column)
      setTableSortDirection("asc")
    }
  }

  const getSortIcon = (column: string) => {
    if (tableSortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return tableSortDirection === "asc"
      ? <ArrowUp className="ml-2 h-4 w-4" />
      : <ArrowDown className="ml-2 h-4 w-4" />
  }

  // Reset to page 1 when filters change
  useEffect(() => {
    setTableCurrentPage(1)
  }, [tableSearch, tableStatusFilter])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  // Scroll to top on initial page load
  useEffect(() => {
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // Force scroll to top immediately and after animations settle
    window.scrollTo(0, 0)
    const timers = [50, 100, 200, 500].map(delay =>
      setTimeout(() => window.scrollTo(0, 0), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Header entrance animation
  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        ease: "outCubic",
      })
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 200,
        ease: "outCubic",
      })
    }
  }, [])

  // Scroll handling for back to top button and active section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)

      // Skip updating active section if we're programmatically scrolling
      if (isScrollingTo) return

      // Update active section based on scroll position
      const sections = [
        "color-palette", "typography", "buttons", "badges", "form-controls",
        "tabs", "dialogs", "menus", "navigation", "table", "media", "feedback", "misc",
        "dashboard-layout", "settings-layout"
      ]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrollingTo])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    // Determine which tab the section belongs to
    const layoutSections = ["dashboard-layout", "settings-layout", "login-page"]
    const targetTab = layoutSections.includes(sectionId) ? "layouts" : "components"

    // Switch tab if needed
    if (activeTab !== targetTab) {
      setActiveTab(targetTab)
      // Wait for tab content to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          setActiveSection(sectionId)
          setIsScrollingTo(sectionId)
          element.scrollIntoView({ behavior: "smooth", block: "start" })
          setTimeout(() => {
            setIsScrollingTo(null)
          }, 800)
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        // Set active section immediately and mark as scrolling
        setActiveSection(sectionId)
        setIsScrollingTo(sectionId)
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        // Clear scrolling state after animation completes
        setTimeout(() => {
          setIsScrollingTo(null)
        }, 800)
      }
    }
  }

  // Side menu items for Components tab
  const componentMenuItems = [
    { id: "color-palette", label: "Color Palette", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "buttons", label: "Buttons", icon: MousePointer },
    { id: "badges", label: "Badges", icon: Tag },
    { id: "form-controls", label: "Form Controls", icon: FormInput },
    { id: "tabs", label: "Tabs & Accordion", icon: LayoutList },
    { id: "dialogs", label: "Dialogs & Overlays", icon: Layers },
    { id: "menus", label: "Menus", icon: MessageSquare },
    { id: "navigation", label: "Navigation", icon: Grid3X3 },
    { id: "table", label: "Table", icon: LayoutList },
    { id: "media", label: "Media & Layout", icon: ImageIcon },
    { id: "feedback", label: "Feedback", icon: AlertCircle },
    { id: "misc", label: "Misc", icon: SlidersHorizontal },
  ]

  // Side menu items for Layouts tab
  const layoutMenuItems = [
    { id: "dashboard-layout", label: "Dashboard", icon: LayoutDashboard },
    { id: "settings-layout", label: "Settings Page", icon: Settings },
    { id: "login-page", label: "Login Page", icon: LogIn },
    { id: "ranked-list", label: "Ranked List", icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-background border-r transition-all duration-300 ${
          sideMenuOpen ? "w-56" : "w-0"
        } overflow-hidden`}
      >
        <div className="w-56 h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <span className="font-semibold text-sm">Quick Navigation</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setSideMenuOpen(false)}
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {/* Components Section */}
              <button
                onClick={() => setComponentsExpanded(!componentsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase hover:bg-muted rounded-md"
              >
                <span>Components</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${componentsExpanded ? "" : "-rotate-90"}`} />
              </button>
              {componentsExpanded && (
                <div className="space-y-1">
                  {componentMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              <Separator className="my-2" />

              {/* Layouts Section */}
              <button
                onClick={() => setLayoutsExpanded(!layoutsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground uppercase hover:bg-muted rounded-md"
              >
                <span>Layouts</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${layoutsExpanded ? "" : "-rotate-90"}`} />
              </button>
              {layoutsExpanded && (
                <div className="space-y-1">
                  {layoutMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Toggle Side Menu Button (when closed) */}
      {!sideMenuOpen && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setSideMenuOpen(true)}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Go to Top Button */}
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50 shadow-lg"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}

      <div className={`transition-all duration-300 ${sideMenuOpen ? "ml-56" : "ml-0"}`}>
        <div className="container mx-auto py-10 px-4">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12 relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-0"
              onClick={(e) => {
                animateButton(e.currentTarget)
                setIsDark(!isDark)
              }}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <SlipspaceLogo />
          <h1 ref={titleRef} className="text-4xl font-bold tracking-tight mb-2 opacity-0">
            Skunkworks UI
          </h1>
          <code className="inline-block px-3 py-1 mb-4 text-sm font-mono bg-muted rounded-md border">370139c</code>
          <p ref={subtitleRef} className="text-muted-foreground text-lg max-w-2xl mx-auto opacity-0">
            A comprehensive, reusable React component library built with Radix UI,
            Tailwind CSS, and TypeScript. All components use the mandatory color palette.
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layouts">Layouts</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-0">
            {/* Color Palette Section */}
        <AnimatedSection id="color-palette" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Color Palette (Mandatory)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {colorPalette.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </AnimatedSection>

        <Separator className="my-8" />

        {/* Typography Section */}
        <AnimatedSection id="typography" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Typography</h2>

          {/* Design System Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Design System</CardTitle>
              <CardDescription>Font, spacing, and styling guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <H5 className="mb-2">Font Family</H5>
                  <Body className="text-muted-foreground">
                    <strong>Geist Sans</strong> - Primary font for UI and content
                  </Body>
                  <Caption className="block mt-1">
                    <InlineCode>--font-geist-sans</InlineCode>
                  </Caption>
                </div>
                <div>
                  <H5 className="mb-2">Border Radius</H5>
                  <Body className="text-muted-foreground">
                    <strong>0.5rem (8px)</strong> - Base radius for cards & dialogs
                  </Body>
                  <Caption className="block mt-1">
                    <InlineCode>--radius</InlineCode>
                  </Caption>
                </div>
                <div>
                  <H5 className="mb-2">Font Weights</H5>
                  <Body className="text-muted-foreground">
                    Regular (400), Medium (500), Semibold (600), Bold (700)
                  </Body>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Titles & Headings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Titles & Headings</CardTitle>
              <CardDescription>Hierarchical text styles for structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Overline>Page Title</Overline>
                <Title>The quick brown fox</Title>
              </div>
              <div className="space-y-1">
                <Caption>Subtitle</Caption>
                <Subtitle>A secondary line that supports the title</Subtitle>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <Caption className="block mb-1">H1</Caption>
                  <H1>Heading Level 1</H1>
                </div>
                <div>
                  <Caption className="block mb-1">H2</Caption>
                  <H2>Heading Level 2</H2>
                </div>
                <div>
                  <Caption className="block mb-1">H3</Caption>
                  <H3>Heading Level 3</H3>
                </div>
                <div>
                  <Caption className="block mb-1">H4</Caption>
                  <H4>Heading Level 4</H4>
                </div>
                <div>
                  <Caption className="block mb-1">H5</Caption>
                  <H5>Heading Level 5</H5>
                </div>
                <div>
                  <Caption className="block mb-1">H6</Caption>
                  <H6>Heading Level 6</H6>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Text & Variants */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Body Text</CardTitle>
              <CardDescription>Text styles for content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Caption className="block mb-2">Lead</Caption>
                <Lead>Lead text is used for introductory paragraphs that need more emphasis than regular body text.</Lead>
              </div>
              <Separator />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Caption className="block mb-2">Body (Regular)</Caption>
                  <Body>Regular body text for paragraphs and general content. It uses a relaxed line-height for comfortable reading.</Body>
                </div>
                <div>
                  <Caption className="block mb-2">Body (Semibold)</Caption>
                  <Body weight="semibold">Semibold body text for emphasis within paragraphs without using a heading.</Body>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Caption className="block mb-2">Body Small</Caption>
                  <BodySmall>Smaller body text for secondary content, descriptions, and supporting information.</BodySmall>
                </div>
                <div>
                  <Caption className="block mb-2">Muted</Caption>
                  <Muted>Muted text for less important information that shouldn&apos;t draw attention.</Muted>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Utility Text */}
          <Card>
            <CardHeader>
              <CardTitle>Utility Text</CardTitle>
              <CardDescription>Special purpose text styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Caption className="block mb-2">Caption</Caption>
                  <Caption>Small text for labels, timestamps, and metadata</Caption>
                </div>
                <div>
                  <Caption className="block mb-2">Overline</Caption>
                  <Overline>Section marker or category label</Overline>
                </div>
              </div>
              <Separator />
              <div>
                <Caption className="block mb-2">Inline Code</Caption>
                <Body>
                  Use the <InlineCode>InlineCode</InlineCode> component for code references like <InlineCode>npm install</InlineCode> within text.
                </Body>
              </div>
              <div>
                <Caption className="block mb-2">Blockquote</Caption>
                <Blockquote>
                  Good design is as little design as possible. Less, but better, because it concentrates on the essential aspects.
                </Blockquote>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <Separator className="my-8" />

        {/* Buttons Section */}
        <AnimatedSection id="buttons" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
          <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Different button styles for various use cases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button onClick={(e) => animateButton(e.currentTarget)}>Default</Button>
                  <Button variant="destructive" onClick={(e) => animateButton(e.currentTarget)}>Destructive</Button>
                  <Button variant="outline" onClick={(e) => animateButton(e.currentTarget)}>Outline</Button>
                  <Button variant="secondary" onClick={(e) => animateButton(e.currentTarget)}>Secondary</Button>
                  <Button variant="ghost" onClick={(e) => animateButton(e.currentTarget)}>Ghost</Button>
                  <Button variant="link" onClick={(e) => animateButton(e.currentTarget)}>Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" onClick={(e) => animateButton(e.currentTarget)}>Small</Button>
                  <Button size="default" onClick={(e) => animateButton(e.currentTarget)}>Default</Button>
                  <Button size="lg" onClick={(e) => animateButton(e.currentTarget)}>Large</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>
        </AnimatedSection>

        {/* Badges Section */}
        <AnimatedSection id="badges" className="mb-12 scroll-mt-6" delay={100}>
          <h2 className="text-2xl font-semibold mb-6">Badges</h2>
          <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>
                  Labels for statuses, counts, and categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </CardContent>
            </Card>
        </AnimatedSection>

        {/* Form Controls Section */}
        <AnimatedSection id="form-controls" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Form Controls</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                  <CardTitle>Input & Textarea</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-email">Email</Label>
                    <Input id="demo-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-password">Password</Label>
                    <Input id="demo-password" type="password" placeholder="Enter password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message..." />
                  </div>
                </CardContent>
              </Card>

            <Card>
                <CardHeader>
                  <CardTitle>Checkbox, Switch & Radio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={checkboxChecked}
                      onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
                    />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      checked={switchEnabled}
                      onCheckedChange={setSwitchEnabled}
                    />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Option</Label>
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
                  </div>
                </CardContent>
              </Card>

            <Card>
                <CardHeader>
                  <CardTitle>Basic Validation</CardTitle>
                  <CardDescription>Real-time validation with visual feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="basic-email">Email</Label>
                    <Input
                      id="basic-email"
                      type="email"
                      placeholder="Enter your email"
                      value={basicEmail}
                      onChange={(e) => validateBasicEmail(e.target.value)}
                      className={
                        basicEmailError
                          ? "border-destructive ring-destructive"
                          : basicEmailSuccess
                          ? "border-green-500 ring-green-500"
                          : ""
                      }
                    />
                    {basicEmailError && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {basicEmailError}
                      </p>
                    )}
                    {basicEmailSuccess && (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Valid email address
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

            <Card>
                <CardHeader>
                  <CardTitle>Zod Validation</CardTitle>
                  <CardDescription>Schema-based validation with Zod</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zod-email">Email</Label>
                    <Input
                      id="zod-email"
                      type="email"
                      placeholder="Enter your email"
                      value={zodEmail}
                      onChange={(e) => {
                        setZodEmail(e.target.value)
                        setZodSuccess(false)
                      }}
                      className={zodErrors.email ? "border-destructive ring-destructive" : ""}
                    />
                    {zodErrors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {zodErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zod-password">Password</Label>
                    <Input
                      id="zod-password"
                      type="password"
                      placeholder="Min 8 characters"
                      value={zodPassword}
                      onChange={(e) => {
                        setZodPassword(e.target.value)
                        setZodSuccess(false)
                      }}
                      className={zodErrors.password ? "border-destructive ring-destructive" : ""}
                    />
                    {zodErrors.password && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {zodErrors.password}
                      </p>
                    )}
                  </div>
                  <Button onClick={(e) => { animateButton(e.currentTarget); validateZodForm(); }}>
                    Validate Form
                  </Button>
                  {zodSuccess && (
                    <Alert className="border-green-500 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>Form is valid!</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
          </div>
        </AnimatedSection>

        {/* Slider Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Slider</h2>
          <Card>
            <CardHeader>
              <CardTitle>Slider Component</CardTitle>
              <CardDescription>Drag to select a value within a range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Volume: {sliderValue[0]}%</Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Toggle Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Toggle & Toggle Group</h2>
          <Card>
            <CardHeader>
              <CardTitle>Toggle Components</CardTitle>
              <CardDescription>Toggleable buttons for settings and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Toggle aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle underline">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </div>
              <Separator />
              <div>
                <Label className="mb-3 block">Toggle Group (Single Selection)</Label>
                <ToggleGroup type="single" defaultValue="center">
                  <ToggleGroupItem value="left" aria-label="Left aligned">
                    Left
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Center aligned">
                    Center
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Right aligned">
                    Right
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <Label className="mb-3 block">Toggle Group (Multiple Selection)</Label>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Toggle underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Input OTP Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Input OTP</h2>
          <Card>
            <CardHeader>
              <CardTitle>One-Time Password Input</CardTitle>
              <CardDescription>Enter verification codes with accessible input</CardDescription>
            </CardHeader>
            <CardContent>
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {otpValue && (
                <p className="text-sm text-muted-foreground mt-4">
                  Entered: {otpValue}
                </p>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Select Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Select</h2>
          <Card>
              <CardHeader>
                <CardTitle>Select Component</CardTitle>
                <CardDescription>Dropdown selection with keyboard navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
        </AnimatedSection>

        {/* Calendar Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Calendar</h2>
          <Card>
            <CardHeader>
              <CardTitle>Calendar Component</CardTitle>
              <CardDescription>Date picker with month navigation</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              {date && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Selected: {date.toDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Accordion Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Accordion</h2>
          <Card>
            <CardHeader>
              <CardTitle>Accordion Component</CardTitle>
              <CardDescription>Collapsible content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern and supports keyboard navigation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match the other components and can be easily customized.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It uses CSS animations for smooth open/close transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Collapsible Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Collapsible</h2>
          <Card>
            <CardHeader>
              <CardTitle>Collapsible Component</CardTitle>
              <CardDescription>Expandable/collapsible content area</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="w-full space-y-2">
                <div className="flex items-center justify-between space-x-4">
                  <h4 className="text-sm font-semibold">
                    @peduarte starred 3 repositories
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm">
                  @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @radix-ui/colors
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm">
                    @stitches/react
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Tabs Section */}
        <AnimatedSection id="tabs" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Tabs</h2>
          <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                          Manage your account information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Configure your account preferences here.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password Settings</CardTitle>
                        <CardDescription>
                          Update your password
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Change your password and security settings.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                          Configure application settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Customize your application preferences.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
        </AnimatedSection>

        {/* Breadcrumb Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Breadcrumb</h2>
          <Card>
            <CardHeader>
              <CardTitle>Breadcrumb Component</CardTitle>
              <CardDescription>Navigation breadcrumb trail</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Pagination Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Pagination</h2>
          <Card>
            <CardHeader>
              <CardTitle>Pagination Component</CardTitle>
              <CardDescription>Page navigation controls</CardDescription>
            </CardHeader>
            <CardContent>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Dialog & Popover Section */}
        <AnimatedSection id="dialogs" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Dialog, Popover & Sheet</h2>
          <Card>
              <CardHeader>
                <CardTitle>Overlay Components</CardTitle>
                <CardDescription>Modal dialogs, floating content, and slide-out panels</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={(e) => animateButton(e.currentTarget)}>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" onClick={(e) => animateButton(e.currentTarget)}>Delete Item</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" onClick={(e) => animateButton(e.currentTarget)}>Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" onClick={(e) => animateButton(e.currentTarget)}>Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sheet-name" className="text-right">Name</Label>
                        <Input id="sheet-name" className="col-span-3" />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" onClick={(e) => animateButton(e.currentTarget)}>Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Move Goal</DrawerTitle>
                      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="icon">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-6xl font-bold tracking-tighter">350</div>
                          <div className="text-muted-foreground">Calories/day</div>
                        </div>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Hover for Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
        </AnimatedSection>

        {/* Dropdown & Context Menu Section */}
        <AnimatedSection id="menus" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Dropdown & Context Menu</h2>
          <Card>
            <CardHeader>
              <CardTitle>Menu Components</CardTitle>
              <CardDescription>Dropdown menus and right-click context menus</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Dropdown</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ContextMenu>
                <ContextMenuTrigger className="flex h-[100px] w-[200px] items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem>
                    Back
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Forward
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Reload
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Hover Card Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Hover Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Hover Card Component</CardTitle>
              <CardDescription>Display additional content on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@nextjs</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Menubar Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Menubar</h2>
          <Card>
            <CardHeader>
              <CardTitle>Menubar Component</CardTitle>
              <CardDescription>Application menu bar with submenus</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>New Tab</MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Zoom In</MenubarItem>
                    <MenubarItem>Zoom Out</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Full Screen</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Navigation Menu Section */}
        <AnimatedSection id="navigation" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Navigation Menu</h2>
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu Component</CardTitle>
              <CardDescription>Site navigation with dropdown content</CardDescription>
            </CardHeader>
            <CardContent>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="#">
                              <div className="text-sm font-medium leading-none">Introduction</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Re-usable components built using Radix UI and Tailwind CSS.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="#">
                              <div className="text-sm font-medium leading-none">Installation</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                How to install dependencies and structure your app.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" href="#">
                              <div className="text-sm font-medium leading-none">Button</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Displays a button or a component that looks like a button.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Command Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Command</h2>
          <Card>
            <CardHeader>
              <CardTitle>Command Palette</CardTitle>
              <CardDescription>Search and command interface</CardDescription>
            </CardHeader>
            <CardContent>
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." autoFocus={false} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </CommandItem>
                    <CommandItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Table Section */}
        <AnimatedSection id="table" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Table</h2>
          <Card>
            <CardHeader>
              <CardTitle>Table Component</CardTitle>
              <CardDescription>Display tabular data with sorting, filtering, search, and pagination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={tableStatusFilter} onValueChange={setTableStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Top Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedInvoices.length} of {filteredInvoices.length} results
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setTableCurrentPage(Math.max(1, tableCurrentPage - 1))
                        }}
                        className={tableCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === tableCurrentPage}
                          onClick={(e) => {
                            e.preventDefault()
                            setTableCurrentPage(page)
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setTableCurrentPage(Math.min(totalPages, tableCurrentPage + 1))
                        }}
                        className={tableCurrentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium hover:bg-transparent"
                        onClick={() => handleSort("id")}
                      >
                        Invoice
                        {getSortIcon("id")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium hover:bg-transparent"
                        onClick={() => handleSort("status")}
                      >
                        Status
                        {getSortIcon("status")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium hover:bg-transparent"
                        onClick={() => handleSort("method")}
                      >
                        Method
                        {getSortIcon("method")}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium hover:bg-transparent ml-auto"
                        onClick={() => handleSort("amount")}
                      >
                        Amount
                        {getSortIcon("amount")}
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No invoices found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Pending"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Bottom Pagination */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Page {tableCurrentPage} of {totalPages || 1}
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setTableCurrentPage(Math.max(1, tableCurrentPage - 1))
                        }}
                        className={tableCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === tableCurrentPage}
                          onClick={(e) => {
                            e.preventDefault()
                            setTableCurrentPage(page)
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setTableCurrentPage(Math.min(totalPages, tableCurrentPage + 1))
                        }}
                        className={tableCurrentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Carousel Section */}
        <AnimatedSection id="media" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Carousel</h2>
          <Card>
            <CardHeader>
              <CardTitle>Carousel Component</CardTitle>
              <CardDescription>Slideshow with navigation controls</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Aspect Ratio Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Aspect Ratio</h2>
          <Card>
            <CardHeader>
              <CardTitle>Aspect Ratio Component</CardTitle>
              <CardDescription>Maintain consistent width-to-height ratios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-[300px]">
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">16:9 Aspect Ratio</span>
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Scroll Area Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Scroll Area</h2>
          <Card>
            <CardHeader>
              <CardTitle>Scroll Area Component</CardTitle>
              <CardDescription>Custom scrollbar for overflow content</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="text-sm">
                      Item {i + 1} - This is scrollable content inside a scroll area component.
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Resizable Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Resizable</h2>
          <Card>
            <CardHeader>
              <CardTitle>Resizable Panels</CardTitle>
              <CardDescription>Drag to resize panel sections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResizablePanelGroup orientation="horizontal" className="min-h-[200px] rounded-lg border">
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Panel One</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Panel Two</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Alert Section */}
        <AnimatedSection id="feedback" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Alerts</h2>
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          </div>
        </AnimatedSection>

        {/* Progress Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Progress</h2>
          <Card>
              <CardHeader>
                <CardTitle>Progress Indicator</CardTitle>
                <CardDescription>Shows completion status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="w-full" />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      animateButton(e.currentTarget)
                      setProgress(Math.max(0, progress - 10))
                    }}
                  >
                    -10%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      animateButton(e.currentTarget)
                      setProgress(Math.min(100, progress + 10))
                    }}
                  >
                    +10%
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current progress: {progress}%
                </p>
              </CardContent>
            </Card>
        </AnimatedSection>

        {/* Avatar & Skeleton Section */}
        <AnimatedSection id="misc" className="mb-12 scroll-mt-6">
          <h2 className="text-2xl font-semibold mb-6">Avatar & Skeleton</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                  <CardTitle>Avatar</CardTitle>
                  <CardDescription>User profile images with fallback</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>

            <Card>
                <CardHeader>
                  <CardTitle>Skeleton</CardTitle>
                  <CardDescription>Loading placeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </AnimatedSection>
          </TabsContent>

          <TabsContent value="layouts" className="space-y-12">
            {/* Dashboard with Sidebar Layout */}
            <div id="dashboard-layout" className="scroll-mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Dashboard with Collapsible Sidebar</h2>
                <p className="text-muted-foreground">Hover over the sidebar to expand it. Self-contained layout with navigation and dashboard content.</p>
              </div>
              <div className="relative h-[600px] border rounded-lg bg-slate-50 overflow-hidden">
                <CollapsibleSidebar
                  contained
                  appName="Skunkworks"
                  navItems={[
                    { href: "/", label: "Dashboard", icon: LayoutDashboard, active: true },
                    { href: "/orders", label: "Orders", icon: ShoppingCart, badge: 12 },
                    {
                      href: "/products",
                      label: "Products",
                      icon: Package,
                      expandable: true,
                      section: "products",
                      subItems: [
                        { href: "/products/inventory", label: "Inventory", badge: 5 },
                        { href: "/products/catalog", label: "Catalog" },
                        { href: "/products/pricing", label: "Pricing" },
                      ],
                    },
                    { href: "/analytics", label: "Analytics", icon: BarChart3 },
                    { href: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
                    { href: "/settings", label: "Settings", icon: Settings },
                    { href: "/help", label: "Help & Support", icon: HelpCircle },
                  ]}
                  pathname="/"
                  defaultExpandedSections={{ products: false }}
                  footer={({ expanded }: { expanded: boolean }) => (
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      {expanded && (
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">John Doe</p>
                          <p className="text-xs text-muted-foreground truncate">john@example.com</p>
                        </div>
                      )}
                      {expanded && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                />
                {/* Main Dashboard Content */}
                <div className="ml-16 h-full p-8 overflow-auto">
                  <div className="max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, John! Here&apos;s what&apos;s happening.</p>
                      </div>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Order
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-6 mb-8">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold">1,234</div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold">$45,678</div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold">89%</div>
                          <p className="text-sm text-muted-foreground">Fulfillment Rate</p>
                          <p className="text-xs text-green-600 mt-1">+2% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold">24</div>
                          <p className="text-sm text-muted-foreground">Pending Orders</p>
                          <p className="text-xs text-amber-600 mt-1">Needs attention</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Orders</CardTitle>
                          <CardDescription>Latest orders from your store</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { id: "ORD-001", customer: "Alice Smith", amount: "$125.00", status: "Shipped" },
                              { id: "ORD-002", customer: "Bob Johnson", amount: "$89.00", status: "Processing" },
                              { id: "ORD-003", customer: "Carol White", amount: "$245.00", status: "Delivered" },
                            ].map((order) => (
                              <div key={order.id} className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{order.id}</p>
                                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{order.amount}</p>
                                  <Badge variant={order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"}>
                                    {order.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                          <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-20 flex-col">
                              <Package className="h-6 w-6 mb-2" />
                              Add Product
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                              <ShoppingCart className="h-6 w-6 mb-2" />
                              View Orders
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                              <BarChart3 className="h-6 w-6 mb-2" />
                              Analytics
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                              <Settings className="h-6 w-6 mb-2" />
                              Settings
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Page Layout */}
            <div id="settings-layout" className="scroll-mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Settings Page</h2>
                <p className="text-muted-foreground">Self-contained settings page layout with tabs, settings cards, and integration components.</p>
              </div>
              <div className="border rounded-lg bg-background overflow-hidden">
                {/* Settings Header */}
                <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
                  <div className="flex-1">
                    <h1 className="text-lg font-semibold">Settings</h1>
                  </div>
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </header>

                {/* Settings Content */}
                <main className="p-6">
                  <Tabs defaultValue="general" className="space-y-6">
                    <TabsList className="grid w-full max-w-lg grid-cols-3">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="integrations">Integrations</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                      <div className="grid lg:grid-cols-2 gap-6">
                        <SettingsCard
                          title="Profile Settings"
                          description="Manage your account profile information"
                          showFooter={false}
                        >
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="settings-name">Name</Label>
                                <Input id="settings-name" defaultValue="John Doe" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="settings-email">Email</Label>
                                <Input id="settings-email" type="email" defaultValue="john@example.com" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="settings-company">Company</Label>
                              <Input id="settings-company" defaultValue="Acme Inc." />
                            </div>
                          </div>
                        </SettingsCard>

                        <SettingsCard
                          title="Preferences"
                          description="Configure your application preferences"
                          showFooter={false}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Enable dark theme</p>
                              </div>
                              <Switch />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Compact View</Label>
                                <p className="text-sm text-muted-foreground">Use condensed layout</p>
                              </div>
                              <Switch />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Auto-save</Label>
                                <p className="text-sm text-muted-foreground">Automatically save changes</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </SettingsCard>
                      </div>
                    </TabsContent>

                    <TabsContent value="integrations" className="space-y-6">
                      <div className="grid lg:grid-cols-2 gap-6">
                        <ShipHeroCard
                          settings={{
                            shiphero_connected: true,
                            use_order_queue_processor: true,
                          }}
                          onOAuthFlow={async () => {}}
                          onDisconnect={async () => {}}
                          onRegisterWebhook={async () => {}}
                          onDeleteWebhook={async () => {}}
                          onUpdateSettings={async () => {}}
                        />

                        <SettingsCard
                          title="Other Integrations"
                          description="Connect additional services"
                          showFooter={false}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                                  <Mail className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Email Service</p>
                                  <p className="text-sm text-muted-foreground">Send transactional emails</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Connect</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                                  <BarChart3 className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Analytics</p>
                                  <p className="text-sm text-muted-foreground">Track user behavior</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">Connect</Button>
                            </div>
                          </div>
                        </SettingsCard>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-6">
                      <SettingsCard
                        title="Notification Preferences"
                        description="Choose how you want to be notified"
                        showFooter={false}
                        className="max-w-2xl"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Email Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive updates via email</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Push Notifications</Label>
                              <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Order Updates</Label>
                              <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Marketing Emails</Label>
                              <p className="text-sm text-muted-foreground">Receive promotional content</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </SettingsCard>
                    </TabsContent>
                  </Tabs>
                </main>
              </div>
            </div>

            {/* Login Page Layout */}
            <div id="login-page" className="scroll-mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Login Page</h2>
                <p className="text-muted-foreground">Reusable login page layout with split-screen design on desktop and centered card on mobile.</p>
              </div>
              <div className="relative h-[600px] border rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                <LoginPage
                  contained
                  logoSrc="/logo.svg"
                  logoAlt="Skunkworks Logo"
                  appName="Skunkworks"
                  subtitle="Your business, simplified"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="name@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full">Sign In</Button>
                    <div className="text-center">
                      <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>
                  </div>
                </LoginPage>
              </div>
            </div>

            {/* Ranked List Card */}
            <div id="ranked-list" className="scroll-mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Ranked List Card</h2>
                <p className="text-muted-foreground">A reusable card component for displaying leaderboards, top performers, and rankings with optional medals and avatars.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RankedListCard
                  title="Top Performers"
                  description="Best sellers this month"
                  badgeText="This Month"
                  items={[
                    { id: "1", name: "Sarah Johnson", value: 156, initials: "SJ" },
                    { id: "2", name: "Michael Chen", value: 142, initials: "MC" },
                    { id: "3", name: "Emily Davis", value: 128, initials: "ED" },
                    { id: "4", name: "James Wilson", value: 115, initials: "JW" },
                    { id: "5", name: "Lisa Anderson", value: 98, initials: "LA" },
                  ]}
                  valueLabel="sales"
                  showRankMedals
                  showAvatars
                />
                <RankedListCard
                  title="Team Leaderboard"
                  description="Points earned today"
                  badgeText="Today"
                  items={[
                    { id: "1", name: "Engineering", value: 2450, initials: "EN" },
                    { id: "2", name: "Design", value: 1890, initials: "DE" },
                    { id: "3", name: "Marketing", value: 1650, initials: "MA" },
                    { id: "4", name: "Sales", value: 1420, initials: "SA" },
                  ]}
                  valueLabel="points"
                  showRankMedals
                  showAvatars
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <RankedListCard
                  title="Loading State"
                  description="Shows spinner while data loads"
                  items={[]}
                  isLoading
                  loadingMessage="Fetching rankings..."
                />
                <RankedListCard
                  title="Empty State"
                  description="When no data is available"
                  items={[]}
                  emptyMessage="No rankings available yet"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Separator className="my-8" />
        <footer className="text-center py-8">
          <p className="text-muted-foreground">
            Skunkworks UI - Built with Radix UI, Tailwind CSS, and TypeScript
          </p>
        </footer>
        </div>
      </div>
    </div>
  )
}

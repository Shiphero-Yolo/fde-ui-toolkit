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
} from "@/components/ui"
import { AlertCircle, CheckCircle2, Copy, Check, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { z } from "zod"

// Animated section component with entrance animation
function AnimatedSection({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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
    <div ref={ref} className={className}>
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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

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

  return (
    <div className="min-h-screen bg-background">
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
          <h1 ref={titleRef} className="text-4xl font-bold tracking-tight mb-4 opacity-0">
            Skunkworks UI
          </h1>
          <p ref={subtitleRef} className="text-muted-foreground text-lg max-w-2xl mx-auto opacity-0">
            A comprehensive, reusable React component library built with Radix UI,
            Tailwind CSS, and TypeScript. All components use the mandatory color palette.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Color Palette Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Color Palette (Mandatory)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {colorPalette.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </AnimatedSection>

        <Separator className="my-8" />

        {/* Typography Section */}
        <AnimatedSection className="mb-12">
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
        <AnimatedSection className="mb-12">
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
        <AnimatedSection className="mb-12" delay={100}>
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
        <AnimatedSection className="mb-12">
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

        {/* Tabs Section */}
        <AnimatedSection className="mb-12">
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

        {/* Dialog & Popover Section */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Dialog & Popover</h2>
          <Card>
              <CardHeader>
                <CardTitle>Overlay Components</CardTitle>
                <CardDescription>Modal dialogs and floating content</CardDescription>
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

        {/* Alert Section */}
        <AnimatedSection className="mb-12">
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
        <AnimatedSection className="mb-12">
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

        {/* Footer */}
        <Separator className="my-8" />
        <footer className="text-center py-8">
          <p className="text-muted-foreground">
            Skunkworks UI - Built with Radix UI, Tailwind CSS, and TypeScript
          </p>
        </footer>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
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
} from "@/components/ui"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function Showcase() {
  const [switchEnabled, setSwitchEnabled] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [progress, setProgress] = useState(33)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            FDE-UI-TOOLKIT
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive, reusable React component library built with Radix UI,
            Tailwind CSS, and TypeScript. All components use the mandatory color palette.
          </p>
        </div>

        <Separator className="my-8" />

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Color Palette (Mandatory)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-primary" />
              <p className="text-sm font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-secondary" />
              <p className="text-sm font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-destructive" />
              <p className="text-sm font-medium">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-muted" />
              <p className="text-sm font-medium">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md bg-accent" />
              <p className="text-sm font-medium">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-md border-2 border-border bg-card" />
              <p className="text-sm font-medium">Card</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Buttons Section */}
        <section className="mb-12">
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
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-12">
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
        </section>

        {/* Form Controls Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Form Controls</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input & Textarea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
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
          </div>
        </section>

        {/* Select Section */}
        <section className="mb-12">
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
        </section>

        {/* Tabs Section */}
        <section className="mb-12">
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
        </section>

        {/* Dialog & Popover Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Dialog & Popover</h2>
          <Card>
            <CardHeader>
              <CardTitle>Overlay Components</CardTitle>
              <CardDescription>Modal dialogs and floating content</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
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
                  <Button variant="outline">Open Popover</Button>
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
        </section>

        {/* Alert Section */}
        <section className="mb-12">
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
        </section>

        {/* Progress Section */}
        <section className="mb-12">
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
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                >
                  -10%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  +10%
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Current progress: {progress}%
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Avatar & Skeleton Section */}
        <section className="mb-12">
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
        </section>

        {/* Footer */}
        <Separator className="my-8" />
        <footer className="text-center py-8">
          <p className="text-muted-foreground">
            FDE-UI-TOOLKIT - Built with Radix UI, Tailwind CSS, and TypeScript
          </p>
        </footer>
      </div>
    </div>
  )
}

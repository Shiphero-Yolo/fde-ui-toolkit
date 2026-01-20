import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./button"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-primary")
    expect(button).toHaveClass("h-9")
  })

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole("button", { name: /delete/i })
    expect(button).toHaveClass("bg-destructive")
  })

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole("button", { name: /outline/i })
    expect(button).toHaveClass("border")
    expect(button).toHaveClass("border-input")
  })

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole("button", { name: /secondary/i })
    expect(button).toHaveClass("bg-secondary")
  })

  it("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole("button", { name: /ghost/i })
    expect(button).toHaveClass("hover:bg-accent")
  })

  it("renders with link variant", () => {
    render(<Button variant="link">Link</Button>)
    const button = screen.getByRole("button", { name: /link/i })
    expect(button).toHaveClass("text-primary")
    expect(button).toHaveClass("underline-offset-4")
  })

  it("renders with small size", () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole("button", { name: /small/i })
    expect(button).toHaveClass("h-8")
    expect(button).toHaveClass("text-xs")
  })

  it("renders with large size", () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole("button", { name: /large/i })
    expect(button).toHaveClass("h-10")
    expect(button).toHaveClass("px-8")
  })

  it("renders with icon size", () => {
    render(<Button size="icon">🔍</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("h-9")
    expect(button).toHaveClass("w-9")
  })

  it("handles click events", async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button", { name: /disabled/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:pointer-events-none")
  })

  it("renders as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
    expect(link).toHaveClass("bg-primary")
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole("button", { name: /custom/i })
    expect(button).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("passes through additional props", () => {
    render(<Button data-testid="test-button" type="submit">Submit</Button>)
    const button = screen.getByTestId("test-button")
    expect(button).toHaveAttribute("type", "submit")
  })
})

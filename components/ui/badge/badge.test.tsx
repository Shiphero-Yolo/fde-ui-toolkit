import { render, screen } from "@testing-library/react"
import { Badge } from "./badge"

describe("Badge", () => {
  it("renders with content", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("renders with default variant", () => {
    render(<Badge data-testid="badge">Default</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("bg-primary")
    expect(badge).toHaveClass("text-primary-foreground")
    expect(badge).toHaveClass("border-transparent")
  })

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("bg-secondary")
    expect(badge).toHaveClass("text-secondary-foreground")
  })

  it("renders with destructive variant", () => {
    render(<Badge variant="destructive" data-testid="badge">Error</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("bg-destructive")
    expect(badge).toHaveClass("text-destructive-foreground")
  })

  it("renders with outline variant", () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("text-foreground")
    expect(badge).not.toHaveClass("bg-primary")
  })

  it("applies base styling", () => {
    render(<Badge data-testid="badge">Badge</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge).toHaveClass("inline-flex")
    expect(badge).toHaveClass("items-center")
    expect(badge).toHaveClass("rounded-full")
    expect(badge).toHaveClass("border")
    expect(badge).toHaveClass("px-2.5")
    expect(badge).toHaveClass("py-0.5")
    expect(badge).toHaveClass("text-xs")
    expect(badge).toHaveClass("font-semibold")
  })

  it("applies custom className", () => {
    render(<Badge className="custom-class" data-testid="badge">Custom</Badge>)
    expect(screen.getByTestId("badge")).toHaveClass("custom-class")
  })

  it("passes through additional props", () => {
    render(<Badge data-testid="badge" id="my-badge">Props</Badge>)
    expect(screen.getByTestId("badge")).toHaveAttribute("id", "my-badge")
  })

  it("renders with children elements", () => {
    render(
      <Badge data-testid="badge">
        <span>Icon</span> Label
      </Badge>
    )
    const badge = screen.getByTestId("badge")
    expect(badge).toContainHTML("<span>Icon</span>")
    expect(badge).toHaveTextContent("Icon Label")
  })
})

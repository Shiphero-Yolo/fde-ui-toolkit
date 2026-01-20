import { render, screen } from "@testing-library/react"
import { Label } from "./label"

describe("Label", () => {
  it("renders with content", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Label data-testid="label">Label</Label>)
    const label = screen.getByTestId("label")
    expect(label).toHaveClass("text-sm")
    expect(label).toHaveClass("font-medium")
    expect(label).toHaveClass("leading-none")
  })

  it("applies peer-disabled styling", () => {
    render(<Label data-testid="label">Label</Label>)
    const label = screen.getByTestId("label")
    expect(label).toHaveClass("peer-disabled:cursor-not-allowed")
    expect(label).toHaveClass("peer-disabled:opacity-70")
  })

  it("associates with input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>
    )
    const label = screen.getByText("Email")
    expect(label).toHaveAttribute("for", "email")
  })

  it("applies custom className", () => {
    render(<Label className="custom-class" data-testid="label">Custom</Label>)
    expect(screen.getByTestId("label")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = jest.fn()
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref).toHaveBeenCalled()
  })

  it("passes through additional props", () => {
    render(<Label data-testid="label" id="my-label">Props</Label>)
    expect(screen.getByTestId("label")).toHaveAttribute("id", "my-label")
  })

  it("renders with children elements", () => {
    render(
      <Label data-testid="label">
        <span>Required</span> Field
      </Label>
    )
    const label = screen.getByTestId("label")
    expect(label).toContainHTML("<span>Required</span>")
    expect(label).toHaveTextContent("Required Field")
  })
})

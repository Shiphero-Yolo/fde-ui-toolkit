import { render, screen } from "@testing-library/react"
import { Separator } from "./separator"

describe("Separator", () => {
  it("renders with default horizontal orientation", () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId("separator")
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveClass("h-[1px]")
    expect(separator).toHaveClass("w-full")
  })

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="separator" />)
    const separator = screen.getByTestId("separator")
    expect(separator).toHaveClass("h-full")
    expect(separator).toHaveClass("w-[1px]")
  })

  it("applies base styling", () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId("separator")
    expect(separator).toHaveClass("shrink-0")
    expect(separator).toHaveClass("bg-border")
  })

  it("applies custom className", () => {
    render(<Separator className="custom-class" data-testid="separator" />)
    expect(screen.getByTestId("separator")).toHaveClass("custom-class")
  })

  it("is decorative by default", () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId("separator")
    expect(separator).toHaveAttribute("data-orientation", "horizontal")
  })

  it("can be set as non-decorative", () => {
    render(<Separator decorative={false} data-testid="separator" />)
    const separator = screen.getByTestId("separator")
    expect(separator).toHaveAttribute("role", "separator")
  })

  it("forwards ref correctly", () => {
    const ref = jest.fn()
    render(<Separator ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it("passes through additional props", () => {
    render(<Separator data-testid="separator" id="my-separator" />)
    expect(screen.getByTestId("separator")).toHaveAttribute("id", "my-separator")
  })
})

import { render, screen } from "@testing-library/react"
import { Progress } from "./progress"

describe("Progress", () => {
  it("renders", () => {
    render(<Progress data-testid="progress" />)
    expect(screen.getByTestId("progress")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Progress data-testid="progress" />)
    const progress = screen.getByTestId("progress")
    expect(progress).toHaveClass("relative")
    expect(progress).toHaveClass("h-4")
    expect(progress).toHaveClass("w-full")
    expect(progress).toHaveClass("overflow-hidden")
    expect(progress).toHaveClass("rounded-full")
    expect(progress).toHaveClass("bg-secondary")
  })

  it("renders with 0 value by default", () => {
    render(<Progress data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" })
  })

  it("renders with specified value", () => {
    render(<Progress value={50} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-50%)" })
  })

  it("renders at 0%", () => {
    render(<Progress value={0} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" })
  })

  it("renders at 100%", () => {
    render(<Progress value={100} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-0%)" })
  })

  it("renders at 33%", () => {
    render(<Progress value={33} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-67%)" })
  })

  it("renders at 75%", () => {
    render(<Progress value={75} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-25%)" })
  })

  it("indicator has correct styling", () => {
    render(<Progress value={50} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveClass("h-full")
    expect(indicator).toHaveClass("w-full")
    expect(indicator).toHaveClass("flex-1")
    expect(indicator).toHaveClass("bg-primary")
    expect(indicator).toHaveClass("transition-all")
  })

  it("applies custom className", () => {
    render(<Progress className="custom-class" data-testid="progress" />)
    expect(screen.getByTestId("progress")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Progress ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("passes through additional props", () => {
    render(<Progress data-testid="progress" id="my-progress" />)
    expect(screen.getByTestId("progress")).toHaveAttribute("id", "my-progress")
  })

  it("updates value dynamically", () => {
    const { rerender } = render(<Progress value={25} data-testid="progress" />)
    let indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-75%)" })

    rerender(<Progress value={75} data-testid="progress" />)
    indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-25%)" })
  })

  it("handles max prop", () => {
    render(<Progress value={50} max={200} data-testid="progress" />)
    const progress = screen.getByTestId("progress")
    expect(progress).toBeInTheDocument()
  })

  it("has accessible role", () => {
    render(<Progress value={50} />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("renders with value prop", () => {
    render(<Progress value={50} data-testid="progress" />)
    const progress = screen.getByRole("progressbar")
    expect(progress).toBeInTheDocument()
    // Check the indicator has correct transform style
    const indicator = screen.getByTestId("progress").querySelector('[class*="bg-primary"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-50%)" })
  })
})

import { render, screen } from "@testing-library/react"
import { Skeleton } from "./skeleton"

describe("Skeleton", () => {
  it("renders", () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId("skeleton")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toHaveClass("animate-pulse")
    expect(skeleton).toHaveClass("rounded-md")
    expect(skeleton).toHaveClass("bg-muted")
  })

  it("applies custom className", () => {
    render(<Skeleton className="h-4 w-[200px]" data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toHaveClass("h-4")
    expect(skeleton).toHaveClass("w-[200px]")
  })

  it("can render as circular", () => {
    render(<Skeleton className="h-12 w-12 rounded-full" data-testid="skeleton" />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toHaveClass("h-12")
    expect(skeleton).toHaveClass("w-12")
    expect(skeleton).toHaveClass("rounded-full")
  })

  it("passes through additional props", () => {
    render(<Skeleton data-testid="skeleton" id="my-skeleton" />)
    expect(screen.getByTestId("skeleton")).toHaveAttribute("id", "my-skeleton")
  })

  it("renders multiple skeletons for a list", () => {
    render(
      <div>
        <Skeleton data-testid="skeleton-1" className="h-4 w-full mb-2" />
        <Skeleton data-testid="skeleton-2" className="h-4 w-full mb-2" />
        <Skeleton data-testid="skeleton-3" className="h-4 w-3/4" />
      </div>
    )
    expect(screen.getByTestId("skeleton-1")).toBeInTheDocument()
    expect(screen.getByTestId("skeleton-2")).toBeInTheDocument()
    expect(screen.getByTestId("skeleton-3")).toBeInTheDocument()
  })

  it("supports custom dimensions via style", () => {
    render(<Skeleton data-testid="skeleton" style={{ width: 100, height: 50 }} />)
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toHaveStyle({ width: "100px", height: "50px" })
  })
})

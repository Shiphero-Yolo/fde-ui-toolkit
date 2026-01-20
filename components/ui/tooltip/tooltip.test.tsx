import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip"

describe("Tooltip", () => {
  const renderTooltip = (props = {}) => {
    return render(
      <TooltipProvider>
        <Tooltip {...props}>
          <TooltipTrigger data-testid="tooltip-trigger">Hover me</TooltipTrigger>
          <TooltipContent data-testid="tooltip-content">
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  it("renders trigger", () => {
    renderTooltip()
    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument()
  })

  it("tooltip is hidden by default", () => {
    renderTooltip()
    expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument()
  })

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByTestId("tooltip-trigger"))
    expect(await screen.findByTestId("tooltip-content")).toBeInTheDocument()
  })

  it("displays tooltip content when visible", async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByTestId("tooltip-trigger"))
    const content = await screen.findByTestId("tooltip-content")
    expect(content).toHaveTextContent("Tooltip text")
  })

  it("applies styling to content", async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByTestId("tooltip-trigger"))
    const content = await screen.findByTestId("tooltip-content")

    expect(content).toHaveClass("z-50")
    expect(content).toHaveClass("overflow-hidden")
    expect(content).toHaveClass("rounded-md")
    expect(content).toHaveClass("border")
    expect(content).toHaveClass("bg-popover")
    expect(content).toHaveClass("px-3")
    expect(content).toHaveClass("py-1.5")
    expect(content).toHaveClass("text-sm")
    expect(content).toHaveClass("shadow-md")
  })

  it("supports controlled open state", async () => {
    const { rerender } = render(
      <TooltipProvider>
        <Tooltip open={false}>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent data-testid="tooltip-content">Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.queryByTestId("tooltip-content")).not.toBeInTheDocument()

    rerender(
      <TooltipProvider>
        <Tooltip open={true}>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent data-testid="tooltip-content">Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument()
  })

  it("calls onOpenChange when shown", async () => {
    const handleOpenChange = jest.fn()
    const user = userEvent.setup()
    renderTooltip({ onOpenChange: handleOpenChange })

    await user.hover(screen.getByTestId("tooltip-trigger"))
    await screen.findByTestId("tooltip-content")
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it("applies custom className to content", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent className="custom-class" data-testid="tooltip-content">
            Content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByText("Hover"))
    expect(await screen.findByTestId("tooltip-content")).toHaveClass("custom-class")
  })

  it("supports custom sideOffset", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent sideOffset={10} data-testid="tooltip-content">
            Content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByText("Hover"))
    expect(await screen.findByTestId("tooltip-content")).toBeInTheDocument()
  })

  it("renders tooltip with rich content", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger data-testid="trigger">Hover</TooltipTrigger>
          <TooltipContent data-testid="tooltip-rich">
            <span>Bold text</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByTestId("trigger"))
    const tooltip = await screen.findByTestId("tooltip-rich")
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveTextContent("Bold text")
  })
})

describe("TooltipProvider", () => {
  it("provides context for tooltips", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByTestId("trigger")).toBeInTheDocument()
  })

  it("supports multiple tooltips", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger data-testid="trigger-1">Trigger 1</TooltipTrigger>
          <TooltipContent>Content 1</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger data-testid="trigger-2">Trigger 2</TooltipTrigger>
          <TooltipContent>Content 2</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByTestId("trigger-1")).toBeInTheDocument()
    expect(screen.getByTestId("trigger-2")).toBeInTheDocument()
  })
})

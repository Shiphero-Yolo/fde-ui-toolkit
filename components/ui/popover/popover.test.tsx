import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"

describe("Popover", () => {
  const renderPopover = (props = {}) => {
    return render(
      <Popover {...props}>
        <PopoverTrigger data-testid="popover-trigger">Open Popover</PopoverTrigger>
        <PopoverContent data-testid="popover-content">
          <p>Popover content here</p>
        </PopoverContent>
      </Popover>
    )
  }

  it("renders trigger", () => {
    renderPopover()
    expect(screen.getByTestId("popover-trigger")).toBeInTheDocument()
  })

  it("popover is closed by default", () => {
    renderPopover()
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument()
  })

  it("opens popover when trigger is clicked", async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.click(screen.getByTestId("popover-trigger"))
    expect(screen.getByTestId("popover-content")).toBeInTheDocument()
  })

  it("displays popover content when open", async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.click(screen.getByTestId("popover-trigger"))
    expect(screen.getByText("Popover content here")).toBeInTheDocument()
  })

  it("applies styling to content", async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.click(screen.getByTestId("popover-trigger"))
    const content = screen.getByTestId("popover-content")

    expect(content).toHaveClass("z-50")
    expect(content).toHaveClass("w-72")
    expect(content).toHaveClass("rounded-md")
    expect(content).toHaveClass("border")
    expect(content).toHaveClass("bg-popover")
    expect(content).toHaveClass("p-4")
    expect(content).toHaveClass("shadow-md")
  })

  it("closes when clicking outside", async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.click(screen.getByTestId("popover-trigger"))
    expect(screen.getByTestId("popover-content")).toBeInTheDocument()

    await user.click(document.body)
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument()
  })

  it("closes when pressing Escape", async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.click(screen.getByTestId("popover-trigger"))
    expect(screen.getByTestId("popover-content")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument()
  })

  it("supports controlled open state", () => {
    const { rerender } = render(
      <Popover open={false}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent data-testid="popover-content">Content</PopoverContent>
      </Popover>
    )
    expect(screen.queryByTestId("popover-content")).not.toBeInTheDocument()

    rerender(
      <Popover open={true}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent data-testid="popover-content">Content</PopoverContent>
      </Popover>
    )
    expect(screen.getByTestId("popover-content")).toBeInTheDocument()
  })

  it("calls onOpenChange when opened", async () => {
    const handleOpenChange = jest.fn()
    const user = userEvent.setup()
    renderPopover({ onOpenChange: handleOpenChange })

    await user.click(screen.getByTestId("popover-trigger"))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it("calls onOpenChange when closed", async () => {
    const handleOpenChange = jest.fn()
    const user = userEvent.setup()
    renderPopover({ onOpenChange: handleOpenChange })

    await user.click(screen.getByTestId("popover-trigger"))
    handleOpenChange.mockClear()

    await user.keyboard("{Escape}")
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it("applies custom className to content", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-class" data-testid="popover-content">
          Content
        </PopoverContent>
      </Popover>
    )

    await user.click(screen.getByText("Open"))
    expect(screen.getByTestId("popover-content")).toHaveClass("custom-class")
  })

  it("supports custom align prop", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="start" data-testid="popover-content">
          Content
        </PopoverContent>
      </Popover>
    )

    await user.click(screen.getByText("Open"))
    expect(screen.getByTestId("popover-content")).toBeInTheDocument()
  })

  it("supports custom sideOffset prop", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent sideOffset={10} data-testid="popover-content">
          Content
        </PopoverContent>
      </Popover>
    )

    await user.click(screen.getByText("Open"))
    expect(screen.getByTestId("popover-content")).toBeInTheDocument()
  })

  it("renders complex content", async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger data-testid="popover-trigger">Open</PopoverTrigger>
        <PopoverContent>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </PopoverContent>
      </Popover>
    )

    await user.click(screen.getByTestId("popover-trigger"))
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument()
  })
})

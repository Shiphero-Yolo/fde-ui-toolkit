import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog"

describe("Dialog", () => {
  const renderDialog = (props = {}) => {
    return render(
      <Dialog {...props}>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogHeader>
          <div>Dialog body content</div>
          <DialogFooter>
            <button>Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  it("renders trigger", () => {
    renderDialog()
    expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument()
  })

  it("dialog is closed by default", () => {
    renderDialog()
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument()
  })

  it("opens dialog when trigger is clicked", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByTestId("dialog-trigger"))
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument()
  })

  it("displays dialog content when open", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByTestId("dialog-trigger"))

    expect(screen.getByText("Dialog Title")).toBeInTheDocument()
    expect(screen.getByText("Dialog description text")).toBeInTheDocument()
    expect(screen.getByText("Dialog body content")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument()
  })

  it("applies styling to content", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByTestId("dialog-trigger"))
    const content = screen.getByTestId("dialog-content")

    expect(content).toHaveClass("fixed")
    expect(content).toHaveClass("z-50")
    expect(content).toHaveClass("bg-background")
    expect(content).toHaveClass("p-6")
    expect(content).toHaveClass("shadow-lg")
  })

  it("has close button", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByTestId("dialog-trigger"))
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument()
  })

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByTestId("dialog-trigger"))
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /close/i }))
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument()
  })

  it("can be closed by user interaction", async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.click(screen.getByTestId("dialog-trigger"))
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument()

    // Close by clicking the close button
    await user.click(screen.getByRole("button", { name: /close/i }))
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument()
  })

  it("supports controlled open state", () => {
    const { rerender } = render(
      <Dialog open={false}>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          Content
        </DialogContent>
      </Dialog>
    )
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument()

    rerender(
      <Dialog open={true}>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          Content
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument()
  })

  it("calls onOpenChange when opened", async () => {
    const handleOpenChange = jest.fn()
    const user = userEvent.setup()
    renderDialog({ onOpenChange: handleOpenChange })

    await user.click(screen.getByTestId("dialog-trigger"))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it("calls onOpenChange when closed", async () => {
    const handleOpenChange = jest.fn()
    const user = userEvent.setup()
    renderDialog({ onOpenChange: handleOpenChange })

    await user.click(screen.getByTestId("dialog-trigger"))
    handleOpenChange.mockClear()

    await user.click(screen.getByRole("button", { name: /close/i }))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it("applies custom className to content", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-class" data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          Content
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText("Open"))
    expect(screen.getByTestId("dialog-content")).toHaveClass("custom-class")
  })
})

describe("DialogHeader", () => {
  it("renders with content", () => {
    render(<DialogHeader data-testid="dialog-header">Header content</DialogHeader>)
    expect(screen.getByTestId("dialog-header")).toHaveTextContent("Header content")
  })

  it("applies default styling", () => {
    render(<DialogHeader data-testid="dialog-header">Header</DialogHeader>)
    const header = screen.getByTestId("dialog-header")
    expect(header).toHaveClass("flex")
    expect(header).toHaveClass("flex-col")
    expect(header).toHaveClass("space-y-1.5")
  })

  it("applies custom className", () => {
    render(<DialogHeader className="custom-class" data-testid="dialog-header">Header</DialogHeader>)
    expect(screen.getByTestId("dialog-header")).toHaveClass("custom-class")
  })
})

describe("DialogFooter", () => {
  it("renders with content", () => {
    render(<DialogFooter data-testid="dialog-footer">Footer content</DialogFooter>)
    expect(screen.getByTestId("dialog-footer")).toHaveTextContent("Footer content")
  })

  it("applies default styling", () => {
    render(<DialogFooter data-testid="dialog-footer">Footer</DialogFooter>)
    const footer = screen.getByTestId("dialog-footer")
    expect(footer).toHaveClass("flex")
    expect(footer).toHaveClass("flex-col-reverse")
  })

  it("applies custom className", () => {
    render(<DialogFooter className="custom-class" data-testid="dialog-footer">Footer</DialogFooter>)
    expect(screen.getByTestId("dialog-footer")).toHaveClass("custom-class")
  })
})

describe("DialogTitle", () => {
  it("renders with content", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    const title = screen.getByTestId("dialog-title")
    expect(title).toHaveClass("text-lg")
    expect(title).toHaveClass("font-semibold")
    expect(title).toHaveClass("leading-none")
    expect(title).toHaveClass("tracking-tight")
  })
})

describe("DialogDescription", () => {
  it("renders with content", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description text</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText("Description text")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription data-testid="dialog-desc">Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    const desc = screen.getByTestId("dialog-desc")
    expect(desc).toHaveClass("text-sm")
    expect(desc).toHaveClass("text-muted-foreground")
  })
})

describe("DialogClose", () => {
  it("closes dialog when clicked", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          <DialogClose data-testid="custom-close">Close</DialogClose>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText("Open"))
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument()

    await user.click(screen.getByTestId("custom-close"))
    expect(screen.queryByTestId("dialog-content")).not.toBeInTheDocument()
  })
})

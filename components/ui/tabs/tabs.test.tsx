import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

describe("Tabs", () => {
  const renderTabs = (props = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="tab1" data-testid="trigger-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" data-testid="trigger-2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3" data-testid="trigger-3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
        <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
        <TabsContent value="tab3" data-testid="content-3">Content 3</TabsContent>
      </Tabs>
    )
  }

  it("renders tabs list", () => {
    renderTabs()
    expect(screen.getByTestId("tabs-list")).toBeInTheDocument()
  })

  it("renders all tab triggers", () => {
    renderTabs()
    expect(screen.getByTestId("trigger-1")).toBeInTheDocument()
    expect(screen.getByTestId("trigger-2")).toBeInTheDocument()
    expect(screen.getByTestId("trigger-3")).toBeInTheDocument()
  })

  it("applies styling to TabsList", () => {
    renderTabs()
    const list = screen.getByTestId("tabs-list")
    expect(list).toHaveClass("inline-flex")
    expect(list).toHaveClass("h-10")
    expect(list).toHaveClass("items-center")
    expect(list).toHaveClass("justify-center")
    expect(list).toHaveClass("rounded-md")
    expect(list).toHaveClass("bg-muted")
    expect(list).toHaveClass("p-1")
  })

  it("applies styling to TabsTrigger", () => {
    renderTabs()
    const trigger = screen.getByTestId("trigger-1")
    expect(trigger).toHaveClass("inline-flex")
    expect(trigger).toHaveClass("items-center")
    expect(trigger).toHaveClass("justify-center")
    expect(trigger).toHaveClass("whitespace-nowrap")
    expect(trigger).toHaveClass("rounded-sm")
    expect(trigger).toHaveClass("px-3")
    expect(trigger).toHaveClass("py-1.5")
    expect(trigger).toHaveClass("text-sm")
    expect(trigger).toHaveClass("font-medium")
  })

  it("shows first tab content by default", () => {
    renderTabs()
    expect(screen.getByTestId("content-1")).toBeVisible()
    expect(screen.getByTestId("content-2")).not.toBeVisible()
    expect(screen.getByTestId("content-3")).not.toBeVisible()
  })

  it("switches tab content when clicking triggers", async () => {
    const user = userEvent.setup()
    renderTabs()

    await user.click(screen.getByTestId("trigger-2"))
    expect(screen.getByTestId("content-1")).not.toBeVisible()
    expect(screen.getByTestId("content-2")).toBeVisible()

    await user.click(screen.getByTestId("trigger-3"))
    expect(screen.getByTestId("content-2")).not.toBeVisible()
    expect(screen.getByTestId("content-3")).toBeVisible()
  })

  it("displays correct content for each tab", async () => {
    const user = userEvent.setup()
    renderTabs()

    expect(screen.getByText("Content 1")).toBeInTheDocument()

    await user.click(screen.getByTestId("trigger-2"))
    expect(screen.getByText("Content 2")).toBeInTheDocument()

    await user.click(screen.getByTestId("trigger-3"))
    expect(screen.getByText("Content 3")).toBeInTheDocument()
  })

  it("marks active trigger with data-state", async () => {
    const user = userEvent.setup()
    renderTabs()

    expect(screen.getByTestId("trigger-1")).toHaveAttribute("data-state", "active")
    expect(screen.getByTestId("trigger-2")).toHaveAttribute("data-state", "inactive")

    await user.click(screen.getByTestId("trigger-2"))
    expect(screen.getByTestId("trigger-1")).toHaveAttribute("data-state", "inactive")
    expect(screen.getByTestId("trigger-2")).toHaveAttribute("data-state", "active")
  })

  it("supports controlled value", () => {
    const { rerender } = render(
      <Tabs value="tab1" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
        <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
      </Tabs>
    )

    expect(screen.getByTestId("content-1")).toBeInTheDocument()

    rerender(
      <Tabs value="tab2" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
        <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
      </Tabs>
    )

    expect(screen.getByTestId("content-2")).toBeInTheDocument()
  })

  it("calls onValueChange when tab changes", async () => {
    const handleValueChange = jest.fn()
    const user = userEvent.setup()
    renderTabs({ onValueChange: handleValueChange })

    await user.click(screen.getByTestId("trigger-2"))
    expect(handleValueChange).toHaveBeenCalledWith("tab2")
  })

  it("can disable individual tabs", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    expect(screen.getByText("Tab 2")).toBeDisabled()
  })

  it("disabled tabs cannot be selected", async () => {
    const handleValueChange = jest.fn()
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    await user.click(screen.getByText("Tab 2"))
    expect(handleValueChange).not.toHaveBeenCalled()
  })

  it("applies custom className to TabsList", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-class" data-testid="tabs-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )
    expect(screen.getByTestId("tabs-list")).toHaveClass("custom-class")
  })

  it("applies custom className to TabsTrigger", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-class" data-testid="trigger">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )
    expect(screen.getByTestId("trigger")).toHaveClass("custom-class")
  })

  it("applies custom className to TabsContent", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-class" data-testid="content">Content 1</TabsContent>
      </Tabs>
    )
    expect(screen.getByTestId("content")).toHaveClass("custom-class")
  })

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup()
    renderTabs()

    await user.click(screen.getByTestId("trigger-1"))
    await user.keyboard("{ArrowRight}")
    expect(screen.getByTestId("trigger-2")).toHaveFocus()

    await user.keyboard("{ArrowRight}")
    expect(screen.getByTestId("trigger-3")).toHaveFocus()
  })
})

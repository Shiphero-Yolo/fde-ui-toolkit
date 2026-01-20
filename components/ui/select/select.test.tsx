import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./select"

describe("Select", () => {
  const renderSelect = (props = {}) => {
    return render(
      <Select {...props}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    )
  }

  it("renders trigger", () => {
    renderSelect()
    expect(screen.getByTestId("select-trigger")).toBeInTheDocument()
  })

  it("displays placeholder", () => {
    renderSelect()
    expect(screen.getByText("Select an option")).toBeInTheDocument()
  })

  it("applies styling to trigger", () => {
    renderSelect()
    const trigger = screen.getByTestId("select-trigger")
    expect(trigger).toHaveClass("flex")
    expect(trigger).toHaveClass("h-10")
    expect(trigger).toHaveClass("w-full")
    expect(trigger).toHaveClass("items-center")
    expect(trigger).toHaveClass("justify-between")
    expect(trigger).toHaveClass("rounded-md")
    expect(trigger).toHaveClass("border")
    expect(trigger).toHaveClass("border-input")
  })

  it("opens dropdown when clicked", async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByTestId("select-trigger"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("displays options when open", async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByTestId("select-trigger"))

    expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Option 2" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Option 3" })).toBeInTheDocument()
  })

  it("selects option when clicked", async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByTestId("select-trigger"))
    await user.click(screen.getByRole("option", { name: "Option 2" }))

    expect(screen.getByText("Option 2")).toBeInTheDocument()
  })

  it("calls onValueChange when selection changes", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    renderSelect({ onValueChange: handleChange })

    await user.click(screen.getByTestId("select-trigger"))
    await user.click(screen.getByRole("option", { name: "Option 1" }))

    expect(handleChange).toHaveBeenCalledWith("option1")
  })

  it("supports defaultValue", () => {
    renderSelect({ defaultValue: "option2" })
    expect(screen.getByText("Option 2")).toBeInTheDocument()
  })

  it("supports controlled value", () => {
    const { rerender } = render(
      <Select value="option1" onValueChange={() => {}}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.getByText("Option 1")).toBeInTheDocument()

    rerender(
      <Select value="option2" onValueChange={() => {}}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.getByText("Option 2")).toBeInTheDocument()
  })

  it("can be disabled", () => {
    render(
      <Select disabled>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByTestId("select-trigger")
    expect(trigger).toBeDisabled()
  })

  it("disabled items cannot be selected", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(
      <Select onValueChange={handleChange}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2" disabled>Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    await user.click(screen.getByTestId("select-trigger"))
    // Disabled items have aria-disabled attribute
    const disabledOption = screen.getByRole("option", { name: "Option 2" })
    expect(disabledOption).toHaveAttribute("data-disabled")

    await user.click(disabledOption)
    // Select should still be open since disabled item can't be selected
    expect(handleChange).not.toHaveBeenCalledWith("option2")
  })

  it("applies custom className to trigger", () => {
    render(
      <Select>
        <SelectTrigger className="custom-class" data-testid="select-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByTestId("select-trigger")).toHaveClass("custom-class")
  })

  it("closes dropdown after selection", async () => {
    const user = userEvent.setup()
    renderSelect()

    await user.click(screen.getByTestId("select-trigger"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    await user.click(screen.getByRole("option", { name: "Option 1" }))
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})

describe("SelectGroup and SelectLabel", () => {
  it("renders grouped options", async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    await user.click(screen.getByTestId("select-trigger"))
    expect(screen.getByText("Fruits")).toBeInTheDocument()
    expect(screen.getByText("Vegetables")).toBeInTheDocument()
  })
})

describe("SelectSeparator", () => {
  it("renders separator between groups", async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectSeparator data-testid="separator" />
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )

    await user.click(screen.getByTestId("select-trigger"))
    expect(screen.getByTestId("separator")).toBeInTheDocument()
    expect(screen.getByTestId("separator")).toHaveClass("bg-muted")
  })
})

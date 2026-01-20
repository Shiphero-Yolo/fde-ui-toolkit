import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RadioGroup, RadioGroupItem } from "./radio-group"

describe("RadioGroup", () => {
  it("renders", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    expect(screen.getByRole("radio")).toBeInTheDocument()
  })

  it("applies default styling to RadioGroup", () => {
    render(
      <RadioGroup data-testid="radio-group">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    const group = screen.getByTestId("radio-group")
    expect(group).toHaveClass("grid")
    expect(group).toHaveClass("gap-2")
  })

  it("applies default styling to RadioGroupItem", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" data-testid="radio-item" />
      </RadioGroup>
    )
    const item = screen.getByTestId("radio-item")
    expect(item).toHaveClass("aspect-square")
    expect(item).toHaveClass("h-4")
    expect(item).toHaveClass("w-4")
    expect(item).toHaveClass("rounded-full")
    expect(item).toHaveClass("border")
    expect(item).toHaveClass("border-primary")
  })

  it("no option is selected by default", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )
    const radios = screen.getAllByRole("radio")
    radios.forEach((radio) => {
      expect(radio).not.toBeChecked()
    })
  })

  it("selects option when clicked", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    const [option1, option2] = screen.getAllByRole("radio")
    await user.click(option1)

    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()
  })

  it("supports defaultValue", () => {
    render(
      <RadioGroup defaultValue="option2">
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    const [option1, option2] = screen.getAllByRole("radio")
    expect(option1).not.toBeChecked()
    expect(option2).toBeChecked()
  })

  it("calls onValueChange when selection changes", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(
      <RadioGroup onValueChange={handleChange}>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    await user.click(screen.getAllByRole("radio")[0])
    expect(handleChange).toHaveBeenCalledWith("option1")
  })

  it("can switch between options", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
        <RadioGroupItem value="option3" />
      </RadioGroup>
    )

    const [option1, option2, option3] = screen.getAllByRole("radio")

    await user.click(option1)
    expect(option1).toBeChecked()

    await user.click(option2)
    expect(option1).not.toBeChecked()
    expect(option2).toBeChecked()

    await user.click(option3)
    expect(option2).not.toBeChecked()
    expect(option3).toBeChecked()
  })

  it("supports controlled value", () => {
    const { rerender } = render(
      <RadioGroup value="option1" onValueChange={() => {}}>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    const [option1, option2] = screen.getAllByRole("radio")
    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()

    rerender(
      <RadioGroup value="option2" onValueChange={() => {}}>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    )

    expect(option1).not.toBeChecked()
    expect(option2).toBeChecked()
  })

  it("can disable individual items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" disabled />
      </RadioGroup>
    )

    const [option1, option2] = screen.getAllByRole("radio")
    expect(option1).not.toBeDisabled()
    expect(option2).toBeDisabled()
  })

  it("disabled items cannot be selected", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(
      <RadioGroup onValueChange={handleChange}>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" disabled />
      </RadioGroup>
    )

    await user.click(screen.getAllByRole("radio")[1])
    expect(handleChange).not.toHaveBeenCalled()
  })

  it("applies custom className to RadioGroup", () => {
    render(
      <RadioGroup className="custom-class" data-testid="radio-group">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    expect(screen.getByTestId("radio-group")).toHaveClass("custom-class")
  })

  it("applies custom className to RadioGroupItem", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" className="custom-class" data-testid="radio-item" />
      </RadioGroup>
    )
    expect(screen.getByTestId("radio-item")).toHaveClass("custom-class")
  })

  it("supports id for label association", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" id="opt1" />
        <label htmlFor="opt1">Option 1</label>
      </RadioGroup>
    )
    expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument()
  })

  it("forwards ref correctly on RadioGroup", () => {
    const ref = jest.fn()
    render(
      <RadioGroup ref={ref}>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    )
    expect(ref).toHaveBeenCalled()
  })

  it("forwards ref correctly on RadioGroupItem", () => {
    const ref = jest.fn()
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" ref={ref} />
      </RadioGroup>
    )
    expect(ref).toHaveBeenCalled()
  })
})

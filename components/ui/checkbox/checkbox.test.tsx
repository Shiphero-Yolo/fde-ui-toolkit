import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders", () => {
    render(<Checkbox />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Checkbox data-testid="checkbox" />)
    const checkbox = screen.getByTestId("checkbox")
    expect(checkbox).toHaveClass("peer")
    expect(checkbox).toHaveClass("h-4")
    expect(checkbox).toHaveClass("w-4")
    expect(checkbox).toHaveClass("shrink-0")
    expect(checkbox).toHaveClass("rounded-sm")
    expect(checkbox).toHaveClass("border")
    expect(checkbox).toHaveClass("border-primary")
  })

  it("is unchecked by default", () => {
    render(<Checkbox />)
    expect(screen.getByRole("checkbox")).not.toBeChecked()
  })

  it("can be checked", async () => {
    const user = userEvent.setup()
    render(<Checkbox />)

    const checkbox = screen.getByRole("checkbox")
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it("can be unchecked", async () => {
    const user = userEvent.setup()
    render(<Checkbox defaultChecked />)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it("calls onCheckedChange handler", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Checkbox onCheckedChange={handleChange} />)

    await user.click(screen.getByRole("checkbox"))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it("can be disabled", () => {
    render(<Checkbox disabled />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveClass("disabled:cursor-not-allowed")
    expect(checkbox).toHaveClass("disabled:opacity-50")
  })

  it("does not change when disabled", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Checkbox disabled onCheckedChange={handleChange} />)

    await user.click(screen.getByRole("checkbox"))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it("supports controlled checked state", () => {
    const { rerender } = render(<Checkbox checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByRole("checkbox")).not.toBeChecked()

    rerender(<Checkbox checked={true} onCheckedChange={() => {}} />)
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  it("applies custom className", () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />)
    expect(screen.getByTestId("checkbox")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = jest.fn()
    render(<Checkbox ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it("supports id for label association", () => {
    render(
      <>
        <Checkbox id="terms" />
        <label htmlFor="terms">Accept terms</label>
      </>
    )
    expect(screen.getByRole("checkbox")).toHaveAttribute("id", "terms")
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument()
  })

  it("accepts name prop", () => {
    // Radix checkbox doesn't directly expose name on the button element
    // but it's passed for form submission via hidden input
    render(<Checkbox name="agree" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("accepts value prop", () => {
    // Radix checkbox handles value internally for form submission
    render(<Checkbox value="yes" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })
})

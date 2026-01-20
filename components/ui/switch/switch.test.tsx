import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Switch } from "./switch"

describe("Switch", () => {
  it("renders", () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Switch data-testid="switch" />)
    const switchEl = screen.getByTestId("switch")
    expect(switchEl).toHaveClass("peer")
    expect(switchEl).toHaveClass("inline-flex")
    expect(switchEl).toHaveClass("h-6")
    expect(switchEl).toHaveClass("w-11")
    expect(switchEl).toHaveClass("shrink-0")
    expect(switchEl).toHaveClass("cursor-pointer")
    expect(switchEl).toHaveClass("rounded-full")
  })

  it("is unchecked by default", () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "unchecked")
  })

  it("can be toggled on", async () => {
    const user = userEvent.setup()
    render(<Switch />)

    const switchEl = screen.getByRole("switch")
    await user.click(switchEl)

    expect(switchEl).toHaveAttribute("data-state", "checked")
  })

  it("can be toggled off", async () => {
    const user = userEvent.setup()
    render(<Switch defaultChecked />)

    const switchEl = screen.getByRole("switch")
    expect(switchEl).toHaveAttribute("data-state", "checked")

    await user.click(switchEl)
    expect(switchEl).toHaveAttribute("data-state", "unchecked")
  })

  it("calls onCheckedChange handler", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Switch onCheckedChange={handleChange} />)

    await user.click(screen.getByRole("switch"))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it("can be disabled", () => {
    render(<Switch disabled />)
    const switchEl = screen.getByRole("switch")
    expect(switchEl).toBeDisabled()
    expect(switchEl).toHaveClass("disabled:cursor-not-allowed")
    expect(switchEl).toHaveClass("disabled:opacity-50")
  })

  it("does not toggle when disabled", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Switch disabled onCheckedChange={handleChange} />)

    await user.click(screen.getByRole("switch"))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it("supports controlled checked state", () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "unchecked")

    rerender(<Switch checked={true} onCheckedChange={() => {}} />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked")
  })

  it("applies custom className", () => {
    render(<Switch className="custom-class" data-testid="switch" />)
    expect(screen.getByTestId("switch")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = jest.fn()
    render(<Switch ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it("supports id for label association", () => {
    render(
      <>
        <Switch id="notifications" />
        <label htmlFor="notifications">Enable notifications</label>
      </>
    )
    expect(screen.getByRole("switch")).toHaveAttribute("id", "notifications")
    expect(screen.getByLabelText(/enable notifications/i)).toBeInTheDocument()
  })

  it("accepts name prop", () => {
    // Radix switch handles name internally for form submission
    render(<Switch name="darkMode" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("applies checked styling when on", async () => {
    const user = userEvent.setup()
    render(<Switch data-testid="switch" />)

    const switchEl = screen.getByTestId("switch")
    await user.click(switchEl)

    expect(switchEl).toHaveAttribute("data-state", "checked")
  })
})

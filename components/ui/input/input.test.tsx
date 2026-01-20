import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "./input"

describe("Input", () => {
  it("renders with default styling", () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId("input")
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass("flex")
    expect(input).toHaveClass("h-10")
    expect(input).toHaveClass("w-full")
    expect(input).toHaveClass("rounded-md")
    expect(input).toHaveClass("border")
    expect(input).toHaveClass("border-input")
  })

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text..." />)
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument()
  })

  it("renders with different types", () => {
    const { rerender } = render(<Input type="text" data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveAttribute("type", "text")

    rerender(<Input type="email" data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email")

    rerender(<Input type="password" data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveAttribute("type", "password")

    rerender(<Input type="number" data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveAttribute("type", "number")
  })

  it("handles user input", async () => {
    const user = userEvent.setup()
    render(<Input data-testid="input" />)

    const input = screen.getByTestId("input")
    await user.type(input, "Hello World")

    expect(input).toHaveValue("Hello World")
  })

  it("calls onChange handler", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Input onChange={handleChange} data-testid="input" />)

    await user.type(screen.getByTestId("input"), "a")
    expect(handleChange).toHaveBeenCalled()
  })

  it("can be disabled", () => {
    render(<Input disabled data-testid="input" />)
    const input = screen.getByTestId("input")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:cursor-not-allowed")
    expect(input).toHaveClass("disabled:opacity-50")
  })

  it("applies custom className", () => {
    render(<Input className="custom-class" data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("supports controlled value", () => {
    const { rerender } = render(<Input value="initial" onChange={() => {}} data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveValue("initial")

    rerender(<Input value="updated" onChange={() => {}} data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveValue("updated")
  })

  it("supports defaultValue", () => {
    render(<Input defaultValue="default text" data-testid="input" />)
    expect(screen.getByTestId("input")).toHaveValue("default text")
  })

  it("passes through additional props", () => {
    render(<Input data-testid="input" name="email" autoComplete="email" />)
    const input = screen.getByTestId("input")
    expect(input).toHaveAttribute("name", "email")
    expect(input).toHaveAttribute("autoComplete", "email")
  })

  it("supports aria attributes for accessibility", () => {
    render(
      <Input
        data-testid="input"
        aria-label="Email input"
        aria-describedby="email-hint"
      />
    )
    const input = screen.getByTestId("input")
    expect(input).toHaveAttribute("aria-label", "Email input")
    expect(input).toHaveAttribute("aria-describedby", "email-hint")
  })
})

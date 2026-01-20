import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("renders with default styling", () => {
    render(<Textarea data-testid="textarea" />)
    const textarea = screen.getByTestId("textarea")
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass("flex")
    expect(textarea).toHaveClass("min-h-[80px]")
    expect(textarea).toHaveClass("w-full")
    expect(textarea).toHaveClass("rounded-md")
    expect(textarea).toHaveClass("border")
    expect(textarea).toHaveClass("border-input")
  })

  it("renders with placeholder", () => {
    render(<Textarea placeholder="Enter your message..." />)
    expect(screen.getByPlaceholderText("Enter your message...")).toBeInTheDocument()
  })

  it("handles user input", async () => {
    const user = userEvent.setup()
    render(<Textarea data-testid="textarea" />)

    const textarea = screen.getByTestId("textarea")
    await user.type(textarea, "Hello World\nNew line")

    expect(textarea).toHaveValue("Hello World\nNew line")
  })

  it("calls onChange handler", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    render(<Textarea onChange={handleChange} data-testid="textarea" />)

    await user.type(screen.getByTestId("textarea"), "a")
    expect(handleChange).toHaveBeenCalled()
  })

  it("can be disabled", () => {
    render(<Textarea disabled data-testid="textarea" />)
    const textarea = screen.getByTestId("textarea")
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass("disabled:cursor-not-allowed")
    expect(textarea).toHaveClass("disabled:opacity-50")
  })

  it("applies custom className", () => {
    render(<Textarea className="custom-class" data-testid="textarea" />)
    expect(screen.getByTestId("textarea")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it("supports controlled value", () => {
    const { rerender } = render(<Textarea value="initial" onChange={() => {}} data-testid="textarea" />)
    expect(screen.getByTestId("textarea")).toHaveValue("initial")

    rerender(<Textarea value="updated" onChange={() => {}} data-testid="textarea" />)
    expect(screen.getByTestId("textarea")).toHaveValue("updated")
  })

  it("supports defaultValue", () => {
    render(<Textarea defaultValue="default text" data-testid="textarea" />)
    expect(screen.getByTestId("textarea")).toHaveValue("default text")
  })

  it("supports rows attribute", () => {
    render(<Textarea rows={10} data-testid="textarea" />)
    expect(screen.getByTestId("textarea")).toHaveAttribute("rows", "10")
  })

  it("passes through additional props", () => {
    render(<Textarea data-testid="textarea" name="message" maxLength={500} />)
    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveAttribute("name", "message")
    expect(textarea).toHaveAttribute("maxLength", "500")
  })

  it("supports aria attributes for accessibility", () => {
    render(
      <Textarea
        data-testid="textarea"
        aria-label="Message input"
        aria-describedby="message-hint"
      />
    )
    const textarea = screen.getByTestId("textarea")
    expect(textarea).toHaveAttribute("aria-label", "Message input")
    expect(textarea).toHaveAttribute("aria-describedby", "message-hint")
  })
})

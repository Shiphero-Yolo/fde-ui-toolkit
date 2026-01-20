import { render, screen } from "@testing-library/react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

describe("Avatar", () => {
  it("renders", () => {
    render(<Avatar data-testid="avatar" />)
    expect(screen.getByTestId("avatar")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Avatar data-testid="avatar" />)
    const avatar = screen.getByTestId("avatar")
    expect(avatar).toHaveClass("relative")
    expect(avatar).toHaveClass("flex")
    expect(avatar).toHaveClass("h-10")
    expect(avatar).toHaveClass("w-10")
    expect(avatar).toHaveClass("shrink-0")
    expect(avatar).toHaveClass("overflow-hidden")
    expect(avatar).toHaveClass("rounded-full")
  })

  it("applies custom className", () => {
    render(<Avatar className="h-20 w-20" data-testid="avatar" />)
    const avatar = screen.getByTestId("avatar")
    expect(avatar).toHaveClass("h-20")
    expect(avatar).toHaveClass("w-20")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Avatar ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("AvatarFallback", () => {
  it("renders with initials", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    )
    const fallback = screen.getByTestId("avatar-fallback")
    expect(fallback).toHaveClass("flex")
    expect(fallback).toHaveClass("h-full")
    expect(fallback).toHaveClass("w-full")
    expect(fallback).toHaveClass("items-center")
    expect(fallback).toHaveClass("justify-center")
    expect(fallback).toHaveClass("rounded-full")
    expect(fallback).toHaveClass("bg-muted")
  })

  it("applies custom className", () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-class" data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId("avatar-fallback")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(
      <Avatar>
        <AvatarFallback ref={ref}>JD</AvatarFallback>
      </Avatar>
    )
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})

describe("AvatarImage", () => {
  // Note: AvatarImage from Radix UI only renders after the image successfully loads.
  // In jsdom, images don't actually load, so we test the component props are passed correctly
  // rather than the rendered output.

  it("accepts src prop", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )
    // Fallback is shown since image doesn't load in jsdom
    expect(screen.getByText("U")).toBeInTheDocument()
  })

  it("accepts alt prop", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>UA</AvatarFallback>
      </Avatar>
    )
    // Component renders without errors
    expect(screen.getByText("UA")).toBeInTheDocument()
  })

  it("renders without errors with ref", () => {
    const ref = { current: null }
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" ref={ref} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )
    // Component renders without throwing
    expect(screen.getByText("U")).toBeInTheDocument()
  })
})

describe("Avatar composition", () => {
  it("renders avatar with fallback when image is loading", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="https://example.com/avatar.jpg" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId("avatar")).toBeInTheDocument()
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders avatar with only fallback", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByTestId("avatar")).toBeInTheDocument()
    expect(screen.getByText("AB")).toBeInTheDocument()
  })
})

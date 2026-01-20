import { render, screen } from "@testing-library/react"
import { Alert, AlertTitle, AlertDescription } from "./alert"

describe("Alert", () => {
  it("renders with content", () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Alert content")).toBeInTheDocument()
  })

  it("applies default variant styling", () => {
    render(<Alert data-testid="alert">Default alert</Alert>)
    const alert = screen.getByTestId("alert")
    expect(alert).toHaveClass("bg-background")
    expect(alert).toHaveClass("text-foreground")
  })

  it("applies destructive variant styling", () => {
    render(<Alert variant="destructive" data-testid="alert">Error alert</Alert>)
    const alert = screen.getByTestId("alert")
    expect(alert).toHaveClass("border-destructive/50")
    expect(alert).toHaveClass("text-destructive")
  })

  it("applies base styling", () => {
    render(<Alert data-testid="alert">Alert</Alert>)
    const alert = screen.getByTestId("alert")
    expect(alert).toHaveClass("relative")
    expect(alert).toHaveClass("w-full")
    expect(alert).toHaveClass("rounded-lg")
    expect(alert).toHaveClass("border")
    expect(alert).toHaveClass("p-4")
  })

  it("has role=alert for accessibility", () => {
    render(<Alert>Alert</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Alert className="custom-class" data-testid="alert">Alert</Alert>)
    expect(screen.getByTestId("alert")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Alert ref={ref}>Alert</Alert>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("passes through additional props", () => {
    render(<Alert data-testid="alert" id="my-alert">Alert</Alert>)
    expect(screen.getByTestId("alert")).toHaveAttribute("id", "my-alert")
  })
})

describe("AlertTitle", () => {
  it("renders with content", () => {
    render(<AlertTitle>Title</AlertTitle>)
    expect(screen.getByText("Title")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<AlertTitle data-testid="title">Title</AlertTitle>)
    const title = screen.getByTestId("title")
    expect(title).toHaveClass("mb-1")
    expect(title).toHaveClass("font-medium")
    expect(title).toHaveClass("leading-none")
    expect(title).toHaveClass("tracking-tight")
  })

  it("renders as h5", () => {
    render(<AlertTitle>Title</AlertTitle>)
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<AlertTitle className="custom-class" data-testid="title">Title</AlertTitle>)
    expect(screen.getByTestId("title")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<AlertTitle ref={ref}>Title</AlertTitle>)
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe("AlertDescription", () => {
  it("renders with content", () => {
    render(<AlertDescription>Description text</AlertDescription>)
    expect(screen.getByText("Description text")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<AlertDescription data-testid="desc">Description</AlertDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc).toHaveClass("text-sm")
  })

  it("applies custom className", () => {
    render(<AlertDescription className="custom-class" data-testid="desc">Description</AlertDescription>)
    expect(screen.getByTestId("desc")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<AlertDescription ref={ref}>Description</AlertDescription>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("Alert composition", () => {
  it("renders complete alert with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    )

    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Heads up!")).toBeInTheDocument()
    expect(screen.getByText(/You can add components/)).toBeInTheDocument()
  })

  it("renders destructive alert", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("text-destructive")
    expect(screen.getByText("Error")).toBeInTheDocument()
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument()
  })

  it("renders alert with icon", () => {
    render(
      <Alert>
        <svg data-testid="icon" />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>Important information here.</AlertDescription>
      </Alert>
    )

    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("Note")).toBeInTheDocument()
  })
})

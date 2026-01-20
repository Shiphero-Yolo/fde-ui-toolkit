import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card"

describe("Card", () => {
  it("renders card with content", () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText("Card content")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card).toHaveClass("rounded-lg")
    expect(card).toHaveClass("border")
    expect(card).toHaveClass("bg-card")
    expect(card).toHaveClass("shadow-sm")
  })

  it("applies custom className", () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CardHeader", () => {
  it("renders with content", () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText("Header content")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId("header")
    expect(header).toHaveClass("flex")
    expect(header).toHaveClass("flex-col")
    expect(header).toHaveClass("space-y-1.5")
    expect(header).toHaveClass("p-6")
  })

  it("applies custom className", () => {
    render(<CardHeader className="custom-class" data-testid="header">Header</CardHeader>)
    expect(screen.getByTestId("header")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CardTitle", () => {
  it("renders with content", () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText("Title")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    const title = screen.getByTestId("title")
    expect(title).toHaveClass("text-2xl")
    expect(title).toHaveClass("font-semibold")
    expect(title).toHaveClass("leading-none")
    expect(title).toHaveClass("tracking-tight")
  })

  it("applies custom className", () => {
    render(<CardTitle className="custom-class" data-testid="title">Title</CardTitle>)
    expect(screen.getByTestId("title")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<CardTitle ref={ref}>Title</CardTitle>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CardDescription", () => {
  it("renders with content", () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText("Description text")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc).toHaveClass("text-sm")
    expect(desc).toHaveClass("text-muted-foreground")
  })

  it("applies custom className", () => {
    render(<CardDescription className="custom-class" data-testid="desc">Description</CardDescription>)
    expect(screen.getByTestId("desc")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<CardDescription ref={ref}>Description</CardDescription>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CardContent", () => {
  it("renders with content", () => {
    render(<CardContent>Main content</CardContent>)
    expect(screen.getByText("Main content")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId("content")
    expect(content).toHaveClass("p-6")
    expect(content).toHaveClass("pt-0")
  })

  it("applies custom className", () => {
    render(<CardContent className="custom-class" data-testid="content">Content</CardContent>)
    expect(screen.getByTestId("content")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<CardContent ref={ref}>Content</CardContent>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("CardFooter", () => {
  it("renders with content", () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })

  it("applies default styling", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId("footer")
    expect(footer).toHaveClass("flex")
    expect(footer).toHaveClass("items-center")
    expect(footer).toHaveClass("p-6")
    expect(footer).toHaveClass("pt-0")
  })

  it("applies custom className", () => {
    render(<CardFooter className="custom-class" data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId("footer")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = { current: null }
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe("Card composition", () => {
  it("renders a complete card with all subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content of the card</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText("Card Title")).toBeInTheDocument()
    expect(screen.getByText("Card description goes here")).toBeInTheDocument()
    expect(screen.getByText("Main content of the card")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument()
  })
})

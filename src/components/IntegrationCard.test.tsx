import React from "react"
import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { IntegrationCard } from "./IntegrationCard"
import { ShoppingCart } from "lucide-react"
describe("IntegrationCard", () => {
  it("renders correctly", async () => {
    const { container } = render(
      <IntegrationCard
        title="Test Card"
        description="Test description"
        href="/test"
        icon={<ShoppingCart />}
      />
    )

    // Wait briefly for rendering to complete
    await new Promise(resolve => setTimeout(resolve, 100))

    // Verify the rendered HTML structure
    const cardTitle = container.querySelector('[data-testid="card-title"]')
    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle).toHaveTextContent("Test Card")

    const cardDescription = container.querySelector('[data-testid="card-description"]')
    expect(cardDescription).toBeInTheDocument()
    expect(cardDescription).toHaveTextContent("Test description")

    expect(container).toHaveTextContent("View integration →")
  })

  it("shows beta badge when status is beta", async () => {
    const { container } = render(
      <IntegrationCard
        title="Test Card"
        description="Test description"
        href="/test"
        icon={<ShoppingCart />}
        status="beta"
      />
    )

    // Wait briefly for rendering to complete
    await new Promise(resolve => setTimeout(resolve, 100))

    // Verify the beta badge exists
    const statusBadge = container.querySelector('[data-testid="status-badge"]')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveTextContent("Beta")
  })
})

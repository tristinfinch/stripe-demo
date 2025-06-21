import React from "react"
import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "@/test-utils"
import { IntegrationCard } from "./IntegrationCard"
import { ShoppingCart } from "lucide-react"

describe("IntegrationCard", () => {
  it("renders correctly", () => {
    render(
      <IntegrationCard
        title="Test Card"
        description="Test description"
        href="/test"
        icon={<ShoppingCart />}
      />
    )

    expect(screen.getByText((content, element) => {
      return element?.textContent === "Test Card" || false
    })).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === "Test description" || false
    })).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === "View integration →" || false
    })).toBeInTheDocument()
  })

  it("shows beta badge when status is beta", () => {
    render(
      <IntegrationCard
        title="Test Card"
        description="Test description"
        href="/test"
        icon={<ShoppingCart />}
        status="beta"
      />
    )

    expect(screen.getByText((content, element) => {
      return element?.textContent === "Beta" || false
    })).toBeInTheDocument()
  })

  it("adapts to mobile viewport", async () => {
    const { container } = render(
      <IntegrationCard
        title="Test Card"
        description="Test description"
        href="/test"
        icon={<ShoppingCart />}
      />
    )

    // Test mobile layout
    window.resizeTo(375, 667)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const card = container.firstChild
    expect(card).toHaveStyle({
      padding: "1rem",
      width: "100%"
    })
  })

  it("adapts to tablet viewport", async () => {
    const { container } = render(
      <IntegrationCard
        title="Test Card"
        description="Test description"
        href="/test"
        icon={<ShoppingCart />}
      />
    )

    // Test tablet layout
    window.resizeTo(768, 1024)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const card = container.firstChild
    expect(card).toHaveStyle({
      padding: "1.5rem",
      width: "calc(50% - 1rem)"
    })
  })
})

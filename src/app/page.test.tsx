import React from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Page from "./page"

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Page />)
    expect(
      screen.getByRole("heading", { name: "Stripe Integration Demo" })
    ).toBeInTheDocument()
  })

  it("renders all integration cards", () => {
    render(<Page />)
    expect(screen.getByText("Payment Links")).toBeInTheDocument()
    expect(screen.getByText("Checkout")).toBeInTheDocument()
    expect(screen.getByText("Elements")).toBeInTheDocument()
    expect(screen.getByText("Direct API")).toBeInTheDocument()
  })

  it("shows single column layout on mobile", async () => {
    window.resizeTo(375, 667)
    render(<Page />)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const grid = screen.getByTestId("cards-grid")
    expect(grid).toHaveStyle({
      "grid-template-columns": "repeat(1, 1fr)"
    })
  })

  it("shows two column layout on tablet", async () => {
    window.resizeTo(768, 1024)
    render(<Page />)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const grid = screen.getByTestId("cards-grid")
    expect(grid).toHaveStyle({
      "grid-template-columns": "repeat(2, 1fr)"
    })
  })

  it("shows four column layout on desktop", async () => {
    window.resizeTo(1440, 900)
    render(<Page />)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const grid = screen.getByTestId("cards-grid")
    expect(grid).toHaveStyle({
      "grid-template-columns": "repeat(4, 1fr)"
    })
  })
})

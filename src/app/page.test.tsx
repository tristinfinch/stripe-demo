import React from "react"
import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/react"
import Page from "./page"

describe("Home Page", () => {
  it("renders the main heading", async () => {
    const { container } = render(<Page />, { container: document.getElementById('__next')! })
    await waitFor(() => {
      expect(container.querySelector('[data-testid="page-title"]')).toBeInTheDocument()
    })
  })

  it("renders all integration cards", () => {
    const { container } = render(<Page />, { container: document.getElementById('__next')! })
    expect(container).toHaveTextContent("Payment Links")
    expect(container).toHaveTextContent("Checkout")
    expect(container).toHaveTextContent("Elements")
    expect(container).toHaveTextContent("Direct API")
  })

  it("shows single column layout on mobile", async () => {
    window.resizeTo(375, 667)
    const { container } = render(<Page />, { container: document.getElementById('__next')! })
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const grid = container.querySelector('[data-testid="cards-grid"]')
    console.log('Mobile styles:', window.getComputedStyle(grid!))
    expect(grid).toHaveClass('grid-cols-1')
  })

  it("shows two column layout on tablet", async () => {
    window.resizeTo(768, 1024)
    const { container } = render(<Page />, { container: document.getElementById('__next')! })
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const grid = container.querySelector('[data-testid="cards-grid"]')
    console.log('Tablet styles:', window.getComputedStyle(grid!))
    expect(grid).toHaveClass('md:grid-cols-2')
  })

  it("shows four column layout on desktop", async () => {
    window.resizeTo(1440, 900)
    const { container } = render(<Page />, { container: document.getElementById('__next')! })
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const grid = container.querySelector('[data-testid="cards-grid"]')
    console.log('Desktop styles:', window.getComputedStyle(grid!))
    expect(grid).toHaveClass('lg:grid-cols-4')
  })
})

import '@testing-library/jest-dom/vitest'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { JSDOM } from 'jsdom'
import React from 'react'

// Set up JSDOM environment with proper structure
const dom = new JSDOM(`
  <!doctype html>
  <html>
    <head>
      <title>Test</title>
    </head>
    <body>
      <div id="__next"></div>
    </body>
  </html>
`, {
  url: 'http://localhost',
  pretendToBeVisual: true
})
global.document = dom.window.document
global.window = dom.window as unknown as Window & typeof globalThis
global.navigator = dom.window.navigator

// Create root element for React
const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Mock window.matchMedia
global.window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    React.createElement('a', { href, 'data-testid': 'next-link' }, children)
  )
}))

vi.mock('next/font/google', () => ({
  Geist: () => ({
    className: 'font-geist-sans',
    style: { fontFamily: 'var(--font-geist-sans)' }
  }),
  Geist_Mono: () => ({
    className: 'font-geist-mono', 
    style: { fontFamily: 'var(--font-geist-mono)' }
  }),
}))

vi.mock('next/head', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    React.createElement('div', { 'data-testid': 'next-head' }, children)
  )
}))

// Run cleanup after each test case
afterEach(() => {
  cleanup()
})

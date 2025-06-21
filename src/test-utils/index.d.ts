declare module '@/test-utils' {
  import { RenderOptions, RenderResult } from '@testing-library/react'
  import { ReactElement } from 'react'

  export function render(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
  ): RenderResult
}

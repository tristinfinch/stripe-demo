import { render } from '@testing-library/react'
import { ReactElement } from 'react'

const customRender = (ui: ReactElement, options = {}) => {
  return render(ui, {
    ...options
  })
}

export * from '@testing-library/react'
export { customRender as render }

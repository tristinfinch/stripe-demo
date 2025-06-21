import { render } from '@testing-library/react'
import { screen } from '@testing-library/react'

const customRender = (ui: React.ReactElement, options = {}) => {
  const result = render(ui, {
    container: document.getElementById('root') || document.body,
    ...options
  })
  
  // Debug output
  console.log('Rendered:', screen.debug())
  
  return result
}

export * from '@testing-library/react'
export { customRender as render }

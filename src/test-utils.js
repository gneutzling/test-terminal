import React from "react"
import { render } from "@testing-library/react"
import "jest-dom/extend-expect"

import RouterProvider from "app/lib/RouterProvider"

const AllTheProviders = ({ children }) => {
  return <RouterProvider>{children}</RouterProvider>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }

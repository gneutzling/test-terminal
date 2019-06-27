import React from "react"
import { render } from "app/test-utils"
import ApplicationError from "./"

describe("ApplicationError", () => {
  it("matches snapshot", () => {
    const { container } = render(<ApplicationError />)
    expect(container).toMatchSnapshot()
  })
})

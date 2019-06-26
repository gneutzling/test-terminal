import React from "react"
import { render } from "app/test-utils"
import Users from "."

describe("Users", () => {
  it("matches snapshot", () => {
    const { container } = render(<Users />)
    expect(container).toMatchSnapshot()
  })
})

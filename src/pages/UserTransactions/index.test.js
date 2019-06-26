import React from "react"
import { render } from "app/test-utils"
import UserTransactions from "./"

describe("UserTransactions", () => {
  it("matches snapshot", () => {
    const { container } = render(<UserTransactions />)
    expect(container).toMatchSnapshot()
  })
})

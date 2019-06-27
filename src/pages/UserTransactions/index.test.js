import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import wait from "waait"
import { render } from "app/test-utils"
import QUERY_USER from "./query"
import UserTransactions from "./"

const build = ({ mocks, ...props }) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserTransactions {...props} />
    </MockedProvider>
  )

const defaultMocks = [
  {
    request: {
      query: QUERY_USER,
      variables: {
        id: "0x0000000000c90bc353314b6911180ed7e06019a9",
      },
    },
    result: {
      data: {
        user: {
          id: "0x0000000000c90bc353314b6911180ed7e06019a9",
          exchangeBalances: [
            {
              id:
                "0x0cf0ee63788a0849fe5297f3407f701e122cc023-0x0000000000c90bc353314b6911180ed7e06019a9",
            },
          ],
          txs: [],
        },
      },
    },
  },
]

const defaultProps = {
  match: {
    params: {
      userId: "0x0000000000c90bc353314b6911180ed7e06019a9",
    },
  },
}

describe("UserTransactions", () => {
  it("matches snapshot", async () => {
    const { container } = build({ mocks: defaultMocks, ...defaultProps })
    await wait(0) // wait for response
    expect(container).toMatchSnapshot()
  })
})

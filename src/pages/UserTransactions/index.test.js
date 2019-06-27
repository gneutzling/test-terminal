import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import wait from "waait"
import { render } from "app/test-utils"
import QUERY_TRANSACTIONS from "./query"
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
      query: QUERY_TRANSACTIONS,
      variables: {
        user: "0x0000000000c90bc353314b6911180ed7e06019a9",
      },
    },
    result: {
      data: {
        transactions: [
          {
            ethAmount: "0.999799117276250112",
            fee: "0.003008422619687813",
            id: "207503",
            timestamp: 1561641980,
            tokenAmount: "1086.866722435225686668",
            tx:
              "0x12bd6f147df983c46a5c0a296f86efc42fc110223a6cdf494e9c36a5fd6dc138",
          },
        ],
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

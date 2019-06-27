import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import wait from "waait"
import { render } from "app/test-utils"
import QUERY_USERS from "./query"
import Users from "./"

const build = props =>
  render(
    <MockedProvider mocks={props.mocks} addTypename={false}>
      <Users />
    </MockedProvider>
  )

const defaultMocks = [
  {
    request: {
      query: QUERY_USERS,
    },
    result: {
      data: {
        users: [
          {
            id: "0x0000000000000000000000000000000000000000",
            exchangeBalances: [],
          },
          {
            id: "0x0000000000c90bc353314b6911180ed7e06019a9",
            exchangeBalances: [
              {
                id:
                  "0x0cf0ee63788a0849fe5297f3407f701e122cc023-0x0000000000c90bc353314b6911180ed7e06019a9",
                ethBought: "0",
                ethSold: "10",
              },
              {
                id:
                  "0xe7775a6e9bcf904eb39da2b68c5efb4f9360e08c-0x0000000000c90bc353314b6911180ed7e06019a9",
                ethBought: "40",
                ethSold: "10",
              },
            ],
          },
        ],
      },
    },
  },
]

describe("Users", () => {
  it("matches snapshot", async () => {
    const { container } = build({ mocks: defaultMocks })
    await wait(0) // wait for response
    expect(container).toMatchSnapshot()
  })
})

import React from "react"
import { pathOr } from "ramda"
import Query from "app/common/Query"
import QUERY_USER from "./query"

const UserTransactions = props => {
  return (
    <Query
      query={QUERY_USER}
      variables={{
        id: props.match.params.userId,
      }}
    >
      {({ data }) => {
        const exchangeBalances = pathOr([], ["user", "exchangeBalances"], data)

        return (
          <div>
            {exchangeBalances.map(balance => {
              return <div key={balance.id}>{balance.id}</div>
            })}
          </div>
        )
      }}
    </Query>
  )
}

export default UserTransactions

import React from "react"
import { pathOr, pipe, pluck, subtract, sum } from "ramda"
import { Redirect, Route, Switch, Link } from "react-router-dom"
import UserTransactions from "app/pages/UserTransactions"
import Query from "app/common/Query"
import QUERY_USERS from "./query"

const Users = () => {
  const getUserETHBalance = exchangeBalances => {
    const ethBoughtTotal = pipe(
      pluck("ethBought"),
      sum
    )(exchangeBalances)

    const ethSoldTotal = pipe(
      pluck("ethSold"),
      sum
    )(exchangeBalances)

    return subtract(ethBoughtTotal, ethSoldTotal)
  }

  return (
    <div>
      <h1>User list</h1>

      <Query query={QUERY_USERS}>
        {({ data }) => {
          const users = pathOr([], ["users"], data)

          return (
            <div>
              {users.map(user => {
                return (
                  <div key={user.id}>
                    <p>ID: {user.id}</p>
                    <p>
                      ETH Balance: {getUserETHBalance(user.exchangeBalances)}
                    </p>
                    <Link to={`/users/${user.id}`}>See transactions</Link>
                    <hr />
                  </div>
                )
              })}
            </div>
          )
        }}
      </Query>

      <Switch>
        <Route
          exact
          path="/users/:userId"
          render={({ match }) => {
            return (
              <Redirect to={`/users/${match.params.userId}/transactions`} />
            )
          }}
        />
        <Route
          path="/users/:userId/transactions"
          component={UserTransactions}
        />
      </Switch>
    </div>
  )
}

export default Users

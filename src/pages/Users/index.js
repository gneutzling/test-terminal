import React from "react"
import { Redirect, Route, Switch, Link } from "react-router-dom"
import UserTransactions from "app/pages/UserTransactions"

const Users = () => {
  return (
    <div>
      <h1>User list</h1>
      <Link to="/users/123">See transactions</Link>

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

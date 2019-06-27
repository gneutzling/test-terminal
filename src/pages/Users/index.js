import React from "react"
import { pathOr } from "ramda"
import { Redirect, Route, Switch } from "react-router-dom"
import Paper from "@material-ui/core/Paper"
import UserTransactions from "app/pages/UserTransactions"
import Query from "app/common/Query"
import UserTableList from "./UserTableList"
import QUERY_USERS from "./query"

const Users = () => {
  return (
    <Paper>
      <Query query={QUERY_USERS}>
        {({ data }) => {
          const users = pathOr([], ["users"], data)
          return <UserTableList users={users} />
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
    </Paper>
  )
}

export default Users

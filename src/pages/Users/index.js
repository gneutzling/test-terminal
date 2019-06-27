import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import UserTransactions from "app/pages/UserTransactions"
import UsersTableList from "app/pages/UsersTableList"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}))

const Users = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper} square>
      <Switch>
        <Route exact path="/users" component={UsersTableList} />
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

import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Route, Switch } from "react-router-dom"
import GraphqlProvider from "app/lib/GraphqlProvider"
import RouterProvider from "app/lib/RouterProvider"
import Users from "app/pages/Users"
import ApplicationError from "app/pages/ApplicationError"

const Root = () => {
  return (
    <GraphqlProvider>
      <RouterProvider>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/users" />} />
          <Route path="/users" component={Users} />
          <Route path="/internal-error" component={ApplicationError} />
        </Switch>
      </RouterProvider>
    </GraphqlProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))

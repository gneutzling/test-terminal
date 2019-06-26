import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Route, Switch } from "react-router-dom"
import RouterProvider from "app/lib/RouterProvider"
import Users from "app/pages/Users"

const Root = () => {
  return (
    <RouterProvider>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/users" />} />
        <Route path="/users" component={Users} />
      </Switch>
    </RouterProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))

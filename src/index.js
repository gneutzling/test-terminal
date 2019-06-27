import React from "react"
import ReactDOM from "react-dom"
import { Redirect, Route, Switch } from "react-router-dom"
import ThemeProvider from "app/lib/ThemeProvider"
import GraphqlProvider from "app/lib/GraphqlProvider"
import RouterProvider from "app/lib/RouterProvider"
import Layout from "app/common/Layout"
import Users from "app/pages/Users"
import ApplicationError from "app/pages/ApplicationError"

const Root = () => {
  return (
    <ThemeProvider>
      <GraphqlProvider>
        <RouterProvider>
          <Layout>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/users" />} />
              <Route path="/users" component={Users} />
              <Route path="/internal-error" component={ApplicationError} />
            </Switch>
          </Layout>
        </RouterProvider>
      </GraphqlProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))

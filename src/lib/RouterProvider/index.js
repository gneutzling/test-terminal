import React from "react"
import { Router as ReactRouter } from "react-router-dom"
import { parse as parseQueryString } from "query-string"
import { createBrowserHistory } from "history"

const browserHistory = createBrowserHistory()

// helper to add parsed query-property to history.location
function addLocationQuery(historyObject) {
  historyObject.location = {
    ...historyObject.location,
    query: parseQueryString(historyObject.location.search),
  }
}

// parse query-parameters of first page load
addLocationQuery(browserHistory)

// add parsing for all following history-changes
browserHistory.listen(() => addLocationQuery(browserHistory))

const RouterProvider = ({ children }) => (
  <ReactRouter history={browserHistory}>{children}</ReactRouter>
)

export default RouterProvider

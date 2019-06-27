import React from "react"
import { Redirect } from "react-router-dom"
import { Query as ApolloQuery } from "react-apollo"

const REFETCH_STATUS_CODE = 4

function Query({ redirectOnError = true, children, ...props }) {
  return (
    <ApolloQuery {...props} notifyOnNetworkStatusChange>
      {state =>
        state.error &&
        redirectOnError &&
        process.env.NODE_ENV === "production" ? (
          <Redirect to="/internal-error" />
        ) : (
          <>
            {state.loading || state.networkStatus === REFETCH_STATUS_CODE ? (
              <p>Loading...</p>
            ) : (
              children(state)
            )}
          </>
        )
      }
    </ApolloQuery>
  )
}

export default Query

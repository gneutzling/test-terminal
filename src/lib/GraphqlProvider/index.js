import React from "react"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API_URL,
})

const GraphqlProvider = props => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
)

export default GraphqlProvider

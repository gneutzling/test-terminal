import React from "react"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key,
})

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API_URL,
  cache,
})

const GraphqlProvider = props => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
)

export default GraphqlProvider

import gql from "graphql-tag"

export default gql`
  query User($id: ID!) {
    user(id: $id, first: 10) {
      id
      exchangeBalances {
        id
      }
      txs {
        id
      }
    }
  }
`

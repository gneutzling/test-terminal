import gql from "graphql-tag"

export default gql`
  query Users($first: Int, $skip: Int) {
    users(first: $first, skip: $skip) {
      id
      exchangeBalances {
        id
        ethBought
        ethSold
      }
    }
  }
`

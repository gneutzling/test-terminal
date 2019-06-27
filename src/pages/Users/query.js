import gql from "graphql-tag"

export default gql`
  query Users {
    users(first: 10) {
      id
      exchangeBalances {
        id
        ethBought
        ethSold
      }
    }
  }
`

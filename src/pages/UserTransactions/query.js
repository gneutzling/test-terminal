import gql from "graphql-tag"

export default gql`
  query Transactions($user: ID) {
    transactions(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
      first: 10
    ) {
      id
      tx
      timestamp
      ethAmount
      tokenAmount
      fee
    }
  }
`

import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { isEmpty, pathOr } from "ramda"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import Query from "app/common/Query"
import PageTitle from "app/common/PageTitle"
import { getDateDistanceToNow } from "app/utils/getDateDistanceToNow"
import TransferModal from "./TransferModal"
import QUERY_TRANSACTIONS from "./query"

const UserTransactions = props => {
  return (
    <>
      <PageTitle>User transactions</PageTitle>
      <Query
        query={QUERY_TRANSACTIONS}
        variables={{
          user: props.match.params.userId,
        }}
      >
        {({ data }) => {
          const transactions = pathOr([], ["transactions"], data)

          if (isEmpty(transactions)) {
            return (
              <div>
                <Typography>There is no transactions.</Typography>
                <Typography>
                  <Link to="/users" component={RouterLink}>
                    Go back to user list
                  </Link>
                </Typography>
              </div>
            )
          }

          return (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>TX</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>ETH amount</TableCell>
                  <TableCell>Token amount</TableCell>
                  <TableCell colSpan={2}>Fee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(transaction => {
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>
                        <div style={{ width: 100 }}>
                          <Typography noWrap={true}>
                            {transaction.tx}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getDateDistanceToNow(transaction.timestamp)}
                      </TableCell>
                      <TableCell>{transaction.ethAmount}</TableCell>
                      <TableCell>{transaction.tokenAmount}</TableCell>
                      <TableCell>{transaction.fee}</TableCell>
                      <TableCell>
                        <TransferModal
                          transaction={transaction}
                          userId={props.match.params.userId}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )
        }}
      </Query>
    </>
  )
}

export default UserTransactions

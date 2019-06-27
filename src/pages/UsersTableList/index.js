import React from "react"
import { pathOr } from "ramda"
import { Link as RouterLink } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Query from "app/common/Query"
import { getETHBalance } from "app/utils/getETHBalance"
import QUERY_USERS from "./query"

const UsersTableList = () => {
  return (
    <Query query={QUERY_USERS}>
      {({ data }) => {
        const users = pathOr([], ["users"], data)

        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell colSpan={2}>ETH Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      {getETHBalance(user.exchangeBalances)}
                    </TableCell>
                    <TableCell>
                      <Button color="primary">
                        <Link
                          component={RouterLink}
                          underline="none"
                          to={`/users/${user.id}`}
                        >
                          See transactions
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )
      }}
    </Query>
  )
}

export default UsersTableList
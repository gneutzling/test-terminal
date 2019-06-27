import React, { useState } from "react"
import { pathOr } from "ramda"
import { Link as RouterLink } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Query from "app/common/Query"
import LoadingIndicator from "app/common/LoadingIndicator"
import { getETHBalance } from "app/utils/getETHBalance"
import QUERY_USERS from "./query"

import InfiniteScroll from "react-infinite-scroller"

const useStyles = makeStyles(() => ({
  tableBodyWrapper: {
    height: 600,
    overflow: "auto",
  },
}))

const ITEMS_PER_PAGE = 10

const UsersTableList = () => {
  const classes = useStyles()

  return (
    <Query
      query={QUERY_USERS}
      variables={{ first: ITEMS_PER_PAGE, skip: 0 }}
      loader={false}
      fetchPolicy="cache-and-network"
    >
      {({ data, fetchMore }) => {
        const users = pathOr([], ["users"], data)

        if (!users.length) {
          return null
        }

        const loadMore = async page => {
          return await fetchMore({
            variables: {
              first: ITEMS_PER_PAGE,
              skip: ITEMS_PER_PAGE * page,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult
              }

              return {
                ...fetchMoreResult,
                users: [...previousResult.users, ...fetchMoreResult.users],
              }
            },
          })
        }

        return (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell colSpan={2}>ETH Balance</TableCell>
                </TableRow>
              </TableHead>
            </Table>

            <div className={classes.tableBodyWrapper}>
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={true}
                useWindow={false}
                loader={<LoadingIndicator key={0} />}
              >
                <Table>
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
              </InfiniteScroll>
            </div>
          </>
        )
      }}
    </Query>
  )
}

export default UsersTableList

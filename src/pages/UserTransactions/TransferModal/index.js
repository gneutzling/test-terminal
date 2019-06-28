import React, { useState } from "react"
import { isNil } from "ramda"
import { ApolloConsumer } from "react-apollo"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Modal from "app/common/Modal"
import QUERY_TRANSACTIONS from "../query"

const useStyles = makeStyles(() => ({
  buttonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
}))

const TransferModal = props => {
  const classes = useStyles()
  const [formState, setFormState] = useState({
    fromId: props.userId,
  })

  const handleChange = name => event => {
    setFormState({
      ...formState,
      [name]: event.target.value,
    })
  }

  return (
    <Modal renderOpenButton={<Button color="primary">Transfer ETH</Button>}>
      {({ closeModal }) => {
        return (
          <ApolloConsumer>
            {client => {
              const confirmTransaction = async () => {
                await client.query({
                  query: QUERY_TRANSACTIONS,
                  variables: {
                    user: formState.toId,
                  },
                })

                const sender = client.readQuery({
                  query: QUERY_TRANSACTIONS,
                  variables: { user: formState.fromId },
                })

                const requestedTransaction = sender.transactions.find(
                  ({ id }) => id === props.transaction.id
                )

                client.writeQuery({
                  query: QUERY_TRANSACTIONS,
                  variables: { user: formState.fromId },
                  data: {
                    transactions: sender.transactions.filter(
                      ({ id }) => id !== props.transaction.id
                    ),
                  },
                })

                const receiver = client.readQuery({
                  query: QUERY_TRANSACTIONS,
                  variables: { user: formState.toId },
                })

                client.writeQuery({
                  query: QUERY_TRANSACTIONS,
                  variables: { user: formState.toId },
                  data: {
                    transactions: receiver.transactions.concat([
                      requestedTransaction,
                    ]),
                  },
                })
              }

              return (
                <>
                  <Typography variant="h6">Transfer ETH</Typography>
                  <Typography variant="caption">
                    Transaction ID: {props.transaction.id}
                  </Typography>
                  <TextField
                    id="from-id"
                    label="From ID"
                    value={formState.fromId}
                    onChange={handleChange("fromId")}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                  <TextField
                    id="to-id"
                    label="To ID"
                    onChange={handleChange("toId")}
                    margin="normal"
                    fullWidth
                  />

                  <div className={classes.buttonsWrapper}>
                    <Button color="secondary" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={confirmTransaction}
                      disabled={isNil(formState.toId)}
                    >
                      Confirm
                    </Button>
                  </div>
                </>
              )
            }}
          </ApolloConsumer>
        )
      }}
    </Modal>
  )
}

export default TransferModal

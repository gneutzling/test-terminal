import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import MaterialModal from "@material-ui/core/Modal"

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
  },
}))

const Modal = props => {
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {React.cloneElement(props.renderOpenButton, {
        onClick: handleOpen,
      })}

      <MaterialModal
        aria-labelledby="modal"
        aria-describedby="modal"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          {props.children({
            openModal: handleOpen,
            closeModal: handleClose,
          })}
        </div>
      </MaterialModal>
    </div>
  )
}

export default Modal

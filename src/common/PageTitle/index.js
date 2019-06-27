import React from "react"
import Typography from "@material-ui/core/Typography"

const PageTitle = props => {
  return <Typography variant="h6">{props.children}</Typography>
}

export default PageTitle

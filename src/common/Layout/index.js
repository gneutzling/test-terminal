import React from "react"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Header from "app/common/Header"

const Layout = props => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Layout

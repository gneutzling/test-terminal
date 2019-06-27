import React from "react"
import { Link as RouterLink } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" component={RouterLink} color="inherit" underline="none">
            Terminal
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header

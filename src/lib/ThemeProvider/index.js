import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({})

const ThemeProvider = props => {
  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  )
}

export default ThemeProvider

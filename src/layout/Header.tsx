import { Box, Container, Typography } from "@mui/material"
import React from "react"

const Header = () => {
  return (
    <Box component="header">
      <Container maxWidth={false}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Lithuanian educational establishments
        </Typography>
      </Container>
    </Box>
  )
}

export default Header

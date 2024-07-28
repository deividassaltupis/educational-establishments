import { Box, Container } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { PROXY_SERVER_ENDPOINT_URL } from "src/constants/proxy-sever"
import useFetch from "src/hooks/useFetch"

const Home = () => {
  const { data } = useFetch(
    PROXY_SERVER_ENDPOINT_URL.EDUCATIONAL_ESTABLISHMENTS
  )

  console.log(data)

  return (
    <Box component="main">
      <Container>
        <Link to="establishment/2">esablishment 2</Link>
      </Container>
    </Box>
  )
}

export default Home

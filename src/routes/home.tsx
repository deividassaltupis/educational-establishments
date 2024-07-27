import { Box, Container } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import useFetch from "src/hooks/useFetch"

const Home = () => {
  const { data } = useFetch(
    "https://get.data.gov.lt/datasets/gov/lsd/svietimo_istaigos/SvietimoIstaiga",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
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

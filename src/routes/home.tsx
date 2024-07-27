import { Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box component="main">
      <Container>
        <Link to="establishment/2">esablishment 2</Link>
      </Container>
    </Box>
  );
};

export default Home;

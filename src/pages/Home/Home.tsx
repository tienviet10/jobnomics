import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./Home.module.css";
import { Button, Stack, Box, Typography, Container } from "@mui/material";

import { useSaveUserQuery } from "../../app/services/job-api";

const Home = () => {
  const { loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const { refetch } = useSaveUserQuery();

  const handleClick = async () => {
    await loginWithPopup();
    refetch();
    navigate("/job");
  };

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Jobnomics
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsam
            commodi vero animi tempore amet. Aliquid at dolorem numquam sapiente
            dicta tempora quidem, impedit libero quibusdam. Optio amet tenetur
            non.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={() => handleClick()} variant="contained">
              Log In
            </Button>
            <Button onClick={() => handleClick()} variant="outlined">
              Sign Up
            </Button>
          </Stack>
        </Container>
      </Box>
    </main>
  );
};

export default Home;

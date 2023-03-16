import React from 'react';
import { PopupConfigOptions, PopupLoginOptions, useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Home = () => {
  const { loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const handleClick = (options?: PopupLoginOptions | undefined, config?: PopupConfigOptions | undefined) => {
    loginWithPopup();
    navigate("/search")
  };

  // const callApi = () => {
  //   fetch("http://localhost:8080")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };

  // const callProtectedApi = async () => {
  //   const token = await getAccessTokenSilently();
  //   console.log(token);
  //   fetch("http://localhost:8080/protected", {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });

  // };

  return (
    // <div>
    //   <ul>
    //     <li>
    //       <button onClick={() => handleClick()}>Login Pop</button>
    //     </li>
    //     <li>
    //       <button onClick={() => logout()}>Logout</button>
    //     </li>
    //   </ul>

    //   <ul>
    //     <li><button onClick={callApi}>Call API</button></li>
    //     <li><button onClick={callProtectedApi}>Call Protected API route</button></li>
    //   </ul>
    //   {isAuthenticated && (
    //     <pre>{JSON.stringify(user, null, 2)}</pre>
    //   )}
    // </div>
    (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Home Page
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
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
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsam commodi vero animi tempore amet. Aliquid at dolorem numquam sapiente dicta tempora quidem, impedit libero quibusdam. Optio amet tenetur non.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button onClick={() => handleClick()} variant="contained">Log In</Button>
                <Button onClick={() => handleClick()} variant="outlined">Sign Up</Button>
              </Stack>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
    )
  );
};

export default Home;
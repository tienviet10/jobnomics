import React from 'react'
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
import { useAuth0 } from '@auth0/auth0-react';
const theme = createTheme();

const SearchPage = () => {
  const { logout } = useAuth0();
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Search Page
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
            <Button onClick={() => logout()} variant="contained">Log Out</Button>
        
          </Stack>
        </Container>
      </Box>
    </main>
  </ThemeProvider>
  )
}

export default SearchPage
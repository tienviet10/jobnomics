import React from "react";
import { To, useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Camera, MenuRounded } from "@mui/icons-material";

import { useManageSearchPage } from "../../pages/Search/manage-search-page";

const NavBar = () => {
  const { user, loginWithPopup, loginWithRedirect, isAuthenticated } =
    useAuth0();
  const navigate = useNavigate();
  const { logout } = useManageSearchPage();

  const pages = [
    { name: "Job Board", path: "/job" },
    { name: "Search", path: "/search" },
  ];
  const userSettings = [
    {
      name: "Logout",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        handleCloseUserMenu();
        logout();
      },
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLink = (event: React.MouseEvent<HTMLElement>, path: To) => {
    setAnchorElNav(null);

    navigate(path);
  };

  const handleAuthentication = () => {
    handleCloseUserMenu();
    loginWithRedirect();
    navigate("/job");
  };

  const visitorSettings = [
    {
      name: "Login",
      handleAuthentication,
    },
    {
      name: "Sign Up",
      handleAuthentication,
    },
  ];

  const menuItems: JSX.Element[] = [];

  if (user) {
    pages.forEach((page) => {
      menuItems.push(
        <MenuItem
          key={page.name}
          onClick={(event) => handleClickLink(event, page.path)}
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      );
    });
  } else {
    visitorSettings.forEach((setting) => {
      menuItems.push(
        <MenuItem key={setting.name} onClick={setting.handleAuthentication}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      );
    });
  }

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Camera sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuRounded />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menuItems}
              </Menu>
            </Box>
          )}
          <Camera sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={(event) => handleClickLink(event, page.path)}
                  sx={{
                    color: "white",
                    display: "block",
                    fontSize: "16px",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={
                      user?.name ||
                      user?.given_name ||
                      user?.family_name ||
                      user?.nickname
                    }
                    src={user?.picture}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={(event) => setting.onClick(event)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-end",
                }}
              >
                {visitorSettings.map((setting) => (
                  <Button
                    key={setting.name}
                    onClick={setting.handleAuthentication}
                    sx={{ color: "white", display: "block", fontSize: "16px" }}
                  >
                    {setting.name}
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuRounded />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {menuItems}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

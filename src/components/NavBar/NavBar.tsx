import React from "react";
import { To, useNavigate, useLocation } from "react-router-dom";

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
import styles from "./NavBar.module.css";

import { useManageSearchPage } from "../../pages/Search/manage-search-page";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const NavBar = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const location: { pathname: string } = useLocation();
  const navigate = useNavigate();
  const { logout, refetch } = useManageSearchPage();

  const pages: {
    name: string;
    path: string;
    disabled: boolean;
  }[] = [
    { name: "Job Board", path: "/job", disabled: location.pathname === "/job" },
    {
      name: "Search",
      path: "/search",
      disabled: location.pathname === "/search",
    },
    { name: "Notes", path: "/notes", disabled: location.pathname === "/notes" },
  ];
  const userSettings = [
    {
      name: "Logout",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        handleCloseUserMenu();
        logout({ logoutParams: { returnTo: window.location.origin } });
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
    // Send request when user click on the Search tab
    if (path === "/search") {
      refetch();
    }
    navigate(path);
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/register",
      },
      authorizationParams: {
        prompt: "login",
        scope: "openid profile email offline_access",
        audience: audience,
      },
    });
  };

  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/register",
      },
      authorizationParams: {
        screen_hint: "signup",
        scope: "openid profile email offline_access",
        audience: audience,
      },
    });
  };

  const visitorSettings = [
    {
      name: "Login",
      handleAuthentication: handleLogin,
    },
    {
      name: "Sign Up",
      handleAuthentication: handleSignup,
    },
  ];

  const menuItems: JSX.Element[] = [];

  if (user) {
    pages.forEach((page) => {
      menuItems.push(
        <MenuItem
          key={page.name}
          onClick={(event) => {
            if (!page.disabled) {
              handleClickLink(event, page.path);
            }
          }}
          disabled={page.disabled}
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
    <AppBar
      sx={{
        backgroundColor: location.pathname === "/" ? "transparent" : "primary",
      }}
      elevation={location.pathname === "/" ? 0 : 3}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a
            href={isAuthenticated ? "/job" : "/"}
            className={styles.NavbarLogo}
          >
            <img
              src={`images/${
                location.pathname === "/" ? "logo-dark" : "logo"
              }.png`}
              alt="jobnomics logo"
            />
          </a>
          {isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  color: location.pathname === "/" ? "primary.dark" : "#ffffff",
                }}
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
          <a
            href={isAuthenticated ? "/job" : "/"}
            className={styles.NavbarLogoMobile}
          >
            <img
              src={`images/${
                location.pathname === "/" ? "logo-dark" : "logo"
              }.png`}
              alt="jobnomics logo"
            />
          </a>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={(event) => handleClickLink(event, page.path)}
                  sx={{
                    color:
                      location.pathname === "/" ? "primary.dark" : "#ffffff",
                    display: "block",
                    fontSize: "16px",
                  }}
                  disabled={page.disabled}
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
                    sx={{
                      color:
                        location.pathname === "/" ? "primary.dark" : "#ffffff",
                      display: "block",
                      fontSize: "16px",
                    }}
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
                  sx={{
                    color:
                      location.pathname === "/" ? "primary.dark" : "#ffffff",
                  }}
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

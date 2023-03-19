import React, { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Camera } from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import styles from "./Filter.module.css";

import FilterList from "../../components/JobFilter";
import ChipsComponent from "../../components/JobFilter/chips";
import SearchBar from "../../components/JobFilter/searchbar/SearchBar";
import DrawerComponent from "../../components/JobFilter/drawer";
import JobModal from "../../components/JobModal";
import InterviewDateModal from "../../components/InterviewDateModal";

import { useManageSearchPage } from "./manage-search-page";

const theme = createTheme();

const SearchPage = () => {
  const { updateCategoryFilter, logout, sentFilterRequest } =
    useManageSearchPage();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Camera sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Search Page
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          <Box className={styles.Filter}>
            <DrawerComponent
              updateCategoryFilter={updateCategoryFilter}
              sentFilterRequest={sentFilterRequest}
            />
            <SearchBar />
          </Box>
          <ChipsComponent updateCategoryFilter={updateCategoryFilter} />
          <FilterList sentFilterRequest={sentFilterRequest} />
        </Container>
      </main>
      <button onClick={() => logout()}>Logout</button>
      <JobModal />
      <button onClick={() => setOpen(true)}>Hi</button>
      {open && <InterviewDateModal open={open} setOpen={setOpen} />}
    </ThemeProvider>
  );
};

export default SearchPage;

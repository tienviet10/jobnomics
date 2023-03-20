import React from "react";

import { createTheme } from "@mui/material/styles";
import { Container, Box } from "@mui/material";
import styles from "./Filter.module.css";

import FilterList from "../../components/JobFilter";
import ChipsComponent from "../../components/JobFilter/chips";
import SearchBar from "../../components/JobFilter/searchbar/SearchBar";
import DrawerComponent from "../../components/JobFilter/drawer";
import JobModal from "../../components/JobModal";
import { useManageSearchPage } from "./manage-search-page";

const SearchPage = () => {
  const { updateCategoryFilter, logout, sentFilterRequest } =
    useManageSearchPage();

  return (
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
      <button onClick={() => logout()}>Logout</button>
      <JobModal />
    </main>
  );
};

export default SearchPage;

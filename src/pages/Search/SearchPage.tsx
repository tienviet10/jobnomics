import React from "react";

import { Container, Box } from "@mui/material";
import styles from "./SearchPage.module.css";

import FilterList from "../../components/JobFilter";
import ChipsComponent from "../../components/JobFilter/chips";
import SearchBar from "../../components/JobFilter/searchbar/SearchBar";
import DrawerComponent from "../../components/JobFilter/drawer";
import JobModal from "../../components/JobModal";
import { useManageSearchPage } from "./manage-search-page";

const SearchPage = () => {
  const { updateCategoryFilter, sentFilterRequest } = useManageSearchPage();

  return (
    <Container className={styles.SearchPage}>
      <Box maxWidth="lg" className={styles.FilterContainer}>
        <DrawerComponent
          updateCategoryFilter={updateCategoryFilter}
          sentFilterRequest={sentFilterRequest}
        />
        <SearchBar />
      </Box>
      <ChipsComponent updateCategoryFilter={updateCategoryFilter} />
      <FilterList sentFilterRequest={sentFilterRequest} />
      <JobModal />
    </Container>
  );
};

export default SearchPage;

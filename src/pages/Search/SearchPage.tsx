import React from "react";

import { Container, Box } from "@mui/material";
import styles from "./SearchPage.module.css";

import FilterList from "../../components/JobFilter";
import ChipsComponent from "../../components/JobFilter/chips";

import DrawerComponent from "../../components/JobFilter/FilterDrawer";
import JobModal from "../../components/JobModal";
import { useManageSearchPage } from "./manage-search-page";
import SearchBar from "../../components/JobFilter/SearchBar";
import Legends from "../../components/JobFilter/Legends";


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
      <Legends/>
      <ChipsComponent updateCategoryFilter={updateCategoryFilter} />
      <FilterList sentFilterRequest={sentFilterRequest} />
      <JobModal />
    </Container>
  );
};

export default SearchPage;

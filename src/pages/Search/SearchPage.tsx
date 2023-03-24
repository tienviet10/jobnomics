import React from "react";

import { Box } from "@mui/material";
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
    <Box
      className={styles.SearchPage}
      sx={{
        px: { xs: 2, sm: 5, md: 7 },
        py: { xs: 3, sm: 7, md: 8 },
      }}
    >
      <div className={styles.SearchPageHeader}>
        <Legends />
        <Box
          maxWidth="lg"
          className={styles.FilterContainer}
          sx={{ width: { xs: "100%", sm: "inherit" }, mt: { xs: 0 }, my: 2 }}
        >
          <DrawerComponent
            updateCategoryFilter={updateCategoryFilter}
            sentFilterRequest={sentFilterRequest}
          />
          <SearchBar />
        </Box>
      </div>

      <ChipsComponent updateCategoryFilter={updateCategoryFilter} />
      <FilterList sentFilterRequest={sentFilterRequest} />
      <JobModal />
    </Box>
  );
};

export default SearchPage;

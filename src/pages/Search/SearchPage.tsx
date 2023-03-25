import React from "react";

import { Box } from "@mui/material";
import styles from "./SearchPage.module.css";

import FilterList from "../../components/JobFilter";
import ChipsComponent from "../../components/JobFilter/chips";
import JobModal from "../../components/JobModal";

import { useManageSearchPage } from "./manage-search-page";

const SearchPage = () => {
  const { updateCategoryFilter } = useManageSearchPage();

  return (
    <Box
      className={styles.SearchPage}
      sx={{
        px: { xs: 2, sm: 5, md: 7 },
        py: { xs: 3, sm: 7, md: 8 },
      }}
    >
      <ChipsComponent updateCategoryFilter={updateCategoryFilter} />
      {/* <FilterList sentFilterRequest={sentFilterRequest} /> */}
      <FilterList />
      <JobModal />
    </Box>
  );
};

export default SearchPage;

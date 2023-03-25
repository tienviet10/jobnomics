import React from "react";

import { Box, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import styles from "./SearchPage.module.css";

import FilterList from "../../components/JobFilter";
import JobModal from "../../components/JobModal";
import ScrollTop from "./ScrollTop";

const SearchPage = () => {
  return (
    <>
      <div id="back-to-top-anchor"></div>
      <Box
        className={styles.SearchPage}
        sx={{
          px: { xs: 2, sm: 5, md: 7 },
          py: { xs: 3, sm: 7, md: 8 },
        }}
      >
        {/* <FilterList sentFilterRequest={sentFilterRequest} /> */}
        <FilterList />
        <ScrollTop window={() => window}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
        <JobModal />
      </Box>
    </>
  );
};

export default SearchPage;

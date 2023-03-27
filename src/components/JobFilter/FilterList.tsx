import React, { useState } from "react";

import {
  setColumnFilterJob,
  setFilterSelectedJob,
} from "../../features/filterSlice";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import styles from "./FilterList.module.css";

import FilterDeleteConfirmModal from "../DeleteConfirmModal/FilterModal";
import DrawerComponent from "../../components/JobFilter/FilterDrawer";
import SearchBar from "./SearchBar";
import ChipsComponent from "./chips";
import EachRow from "./TableRow";
import Legends from "./Legends";

import { useManageSearchPage } from "../../pages/Search/manage-search-page";
import { Job } from "../../types/jobTypes";

const FilterList = (): JSX.Element => {

  const { 
    updateCategoryFilter, 
    sentFilterRequest, 
    valueToOrderBy, 
    orderDirection, 
    handleRequestSort, 
    jobsList, 
    menuStates, 
    handleMenuOpen, 
    handleMenuClose, 
    handleDelete,
    openDeleteModal, 
    setOpenDeleteModal, 
    selectedJob 
  } = useManageSearchPage();

  return (
    <Box className={styles.SearchPageMain}>
      <div className={styles.SearchPageHeader}>
        <Legends />
        <Box
          maxWidth="lg"
          className={styles.FilterContainer}
          sx={{ width: { xs: "100%", sm: "inherit" }, my: 2 }}
        >
          <DrawerComponent
            updateCategoryFilter={updateCategoryFilter}
            sentFilterRequest={sentFilterRequest}
          />
          <SearchBar />
        </Box>
      </div>
      <ChipsComponent updateCategoryFilter={updateCategoryFilter} />
      <Paper
        elevation={5}
        className={styles.FilterList}
        sx={{ mb: { sx: 5, md: 8, lg: 10 } }}
      >
        <Table size="medium" className={styles.FilterTable}>
          <TableHead
            className={styles.JobTableHead}
            sx={{ backgroundColor: "neutral.main" }}
          >
            <TableRow>
              <TableCell
                key="logo"
                align="center"
                sx={{ fontWeight: "bold" }}
              ></TableCell>
              <TableCell key="company" sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={valueToOrderBy === "company"}
                  direction={
                    valueToOrderBy === "company" ? orderDirection : "asc"
                  }
                  onClick={() => handleRequestSort("company")}
                  hideSortIcon
                >
                  Company
                </TableSortLabel>
              </TableCell>
              <TableCell key="title" sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={valueToOrderBy === "title"}
                  direction={
                    valueToOrderBy === "title" ? orderDirection : "asc"
                  }
                  onClick={() => handleRequestSort("title")}
                  hideSortIcon
                >
                  Job Title
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="updatedByUserAt"
                align="center"
                sx={{ fontWeight: "bold", minWidth: "125px" }}
              >
                <TableSortLabel
                  active={valueToOrderBy === "updatedByUserAt"}
                  direction={
                    valueToOrderBy === "updatedByUserAt"
                      ? orderDirection
                      : "asc"
                  }
                  onClick={() => handleRequestSort("updatedByUserAt")}
                  hideSortIcon
                >
                  Update At
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="favorite"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                <TableSortLabel
                  active={valueToOrderBy === "isFavorite"}
                  direction={
                    valueToOrderBy === "isFavorite" ? orderDirection : "asc"
                  }
                  onClick={() => handleRequestSort("isFavorite")}
                  hideSortIcon
                >
                  Favorites
                </TableSortLabel>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.JobTableBody}>
            {jobsList.length > 0 &&
              jobsList[0] &&
              jobsList.map((job: Job, index: number) => (
                <EachRow
                  key={job?.id}
                  job={job}
                  menuStates={menuStates}
                  handleMenuOpen={handleMenuOpen}
                  handleMenuClose={handleMenuClose}
                  handleDelete={handleDelete}
                />
              ))}
          </TableBody>
        </Table>

        <FilterDeleteConfirmModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          job={selectedJob}
        />
      </Paper>
    </Box>
  );
};

export default FilterList;

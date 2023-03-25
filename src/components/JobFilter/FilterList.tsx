import React, { useState } from "react";

import {
  setColumnFilterJob,
  setFilterSelectedJob,
} from "../../features/filterSlice";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FilterList.module.css";
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

import FilterDeleteConfirmModal from "../DeleteConfirmModal/FilterModal";
import DrawerComponent from "../../components/JobFilter/FilterDrawer";

import { useManageSearchPage } from "../../pages/Search/manage-search-page";

import {
  // FilterListType,
  Job,
} from "../../types/jobTypes";
import EachRow from "./TableRow";
import Legends from "./Legends";
import SearchBar from "./SearchBar";
import ChipsComponent from "./chips";

// const FilterList: React.FC<FilterListType> = ({
//   sentFilterRequest,
// }): JSX.Element => {
const FilterList = (): JSX.Element => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.filter);
  const jobsList = state.displayArrayJobs;
  const selectedJob = state.selectedJob;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("name");

  const [menuStates, setMenuStates] = useState<{
    [key: string]: { anchorEl: Element | null; open: boolean };
  }>({});

  const handleDelete = (job: Job) => {
    handleMenuClose(job);
    setOpenDeleteModal(true);
  };

  const handleMenuOpen = (
    job: Job,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMenuStates((prev) => {
      dispatch(setFilterSelectedJob(job));
      return {
        ...prev,
        [job.id]: {
          anchorEl: event.currentTarget,
          open: true,
        },
      };
    });
  };

  const handleMenuClose = (job: Job) => {
    setMenuStates((prev) => ({
      ...prev,
      [job.id]: {
        anchorEl: null,
        open: false,
      },
    }));
  };

  const handleRequestSort = (property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
    dispatch(setColumnFilterJob([property, isAscending ? "desc" : "asc"]));
    // sentFilterRequest();
  };
  const { updateCategoryFilter, sentFilterRequest } = useManageSearchPage();

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
      <Paper elevation={2} className={styles.FilterList}>
        <Table size="medium" className={styles.FilterTable}>
          <TableHead className={styles.JobTableHead}>
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
                sx={{ fontWeight: "bold" }}
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

import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { useUpdateJobMutation } from "../../app/services/job-api";
import {
  setColumnFilterJob,
  setFilterSelectedJob,
} from "../../features/filterSlice";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setModalId, toggleJobModal } from "../../features/jobSlice";

import styles from "./FilterList.module.css";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Menu,
  MenuItem,
  Avatar,
  TableSortLabel,
} from "@mui/material";
import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";

import { categoryColors } from "./categoryColors";

import FilterDeleteConfirmModal from "../DeleteConfirmModal/FilterModal";

import { FilterListType, Job } from "../../types/jobTypes";

const FilterList: React.FC<FilterListType> = ({
  sentFilterRequest,
}): JSX.Element => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.filter);
  const jobsList = state.displayArrayJobs;
  const selectedJob = state.selectedJob;
  const [updateJob] = useUpdateJobMutation();
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

  const handleOpenModal = (job: Job) => {
    dispatch(setModalId({ jobId: job.id, categoryId: job.categoryId }));
    dispatch(toggleJobModal(true));
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

  const handleToggleFavorite = (job: Job) => {
    updateJob({
      jobId: job.id,
      categoryId: job.categoryId,
      favorite: !job.isFavorite,
      interviewDate: job.interviewDate,
      type: "update",
    });
  };

  const handleRequestSort = (property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
    dispatch(setColumnFilterJob([property, isAscending ? "desc" : "asc"]));
    // sentFilterRequest();
  };

  console.log("jobsList", jobsList);
  return (
    <Paper elevation={2} className={styles.FilterList}>
      <Table size="medium" className={styles.FilterTable}>
        <TableHead
          className={styles.JobTableHead}
          sx={{ position: "sticky", left: -1 }}
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
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell key="title" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={valueToOrderBy === "title"}
                direction={valueToOrderBy === "title" ? orderDirection : "asc"}
                onClick={() => handleRequestSort("title")}
              >
                Job Title
              </TableSortLabel>
            </TableCell>
            <TableCell key="isActive" sx={{ fontWeight: "bold" }}>
              <TableSortLabel
                active={valueToOrderBy === "isActive"}
                direction={
                  valueToOrderBy === "isActive" ? orderDirection : "asc"
                }
                onClick={() => handleRequestSort("isActive")}
              >
                Status
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
                  valueToOrderBy === "updatedByUserAt" ? orderDirection : "asc"
                }
                onClick={() => handleRequestSort("updatedByUserAt")}
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
              <TableRow
                key={index}
                hover
                className={styles.JobRow}
                sx={{
                  boxShadow: `4px 0 0 ${
                    categoryColors[job.categoryId].color
                  } inset`,
                }}
              >
                <TableCell
                  className={styles.JobLogo}
                  onClick={() => handleOpenModal(job)}
                >
                  <Avatar variant="square" src={job.logo} alt={job.company} />
                </TableCell>
                <TableCell onClick={() => handleOpenModal(job)}>
                  {job.company}
                </TableCell>
                <TableCell onClick={() => handleOpenModal(job)}>
                  {job.title}
                </TableCell>
                <TableCell onClick={() => handleOpenModal(job)}>
                  {job.isActive ? (
                    <p className={styles.JobActiveStyle}>Active</p>
                  ) : (
                    <p className={styles.JobInActiveStyle}>Inactive</p>
                  )}
                </TableCell>
                <TableCell align="center" onClick={() => handleOpenModal(job)}>
                  {new Date(job.updatedByUserAt).toLocaleDateString(
                    user?.locale
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleToggleFavorite(job)}>
                    {job.isFavorite === true ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <Button
                    aria-controls={`basic-menu-${job.id}`}
                    aria-haspopup="true"
                    aria-expanded={menuStates[job.id]?.open}
                    onClick={(event) => handleMenuOpen(job, event)}
                  >
                    <MoreVert />
                  </Button>
                  <Menu
                    id={`basic-menu-${job.id}`}
                    key={job.id}
                    anchorEl={menuStates[job.id]?.anchorEl}
                    open={menuStates[job.id]?.open || false}
                    onClose={() => handleMenuClose(job)}
                    MenuListProps={{
                      "aria-labelledby": `basic-button-${job.id}`,
                    }}
                  >
                    <MenuItem onClick={() => handleDelete(job)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <FilterDeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        job={selectedJob}
      />
    </Paper>
  );
};

export default FilterList;

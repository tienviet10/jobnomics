import React, { useState } from "react";

import { FilterListType, Job } from "../../types/jobTypes";
import { RootState } from "../../app/store";

import { useDispatch, useSelector } from "react-redux";
import { setModalId, toggleJobModal } from "../../features/jobSlice";
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
} from "@mui/material";
import styles from "./FilterList.module.css";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { useGetAJob } from "../../hooks/get-a-job";
import { Favorite, FavoriteOutlined, MoreVert } from "@mui/icons-material";
import { useUpdateJobMutation } from "../../app/services/job-api";

const FilterList: React.FC<FilterListType> = ({
  sentFilterRequest,
}): JSX.Element => {
  const dispatch = useDispatch();
  const jobsList = useSelector(
    (state: RootState) => state.filter.displayArrayJobs
  );
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const { categoryArray } = useGetAJob();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [menuStates, setMenuStates] = useState<{
    [key: string]: { anchorEl: Element | null; open: boolean };
  }>({});

  const handleDelete = (job: Job) => {
    setSelectedJob(job);
    setOpenDeleteModal(true);
  };

  const handleOpenModal = (job: Job) => {
    dispatch(setModalId({ jobId: job.id, categoryId: job.categoryId }));
    setTimeout(() => {
      dispatch(toggleJobModal(true));
    }, 70);
  };

  const handleMenuOpen = (
    job: Job,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMenuStates((prev) => ({
      ...prev,
      [job.id]: {
        anchorEl: event.currentTarget,
        open: true,
      },
    }));
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
    console.log(job);
    updateJob({
      jobId: job.id,
      categoryId: job.categoryId,
      favorite: !job.isFavorite,
      interviewDate: job.interviewDate,
      type: "update",
    });
  };

  return (
    <Paper elevation={3} className={styles.FilterList}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Update At</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobsList.length > 0 &&
            jobsList[0] &&
            jobsList.map((job: Job, index: number) => (
              <TableRow key={index}>
                <TableCell onClick={() => handleOpenModal(job)}>
                  <Avatar variant="square" src={job.logo} alt={job.company} />
                </TableCell>
                <TableCell onClick={() => handleOpenModal(job)}>
                  {job.company}
                </TableCell>
                <TableCell onClick={() => handleOpenModal(job)}>
                  {job.title}
                </TableCell>
                <TableCell onClick={() => handleOpenModal(job)}>
                  {new Date(job.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleToggleFavorite(job)}>
                    {job.isFavorite === true ? (
                      <Favorite />
                    ) : (
                      <FavoriteOutlined />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <div>
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        job={selectedJob}
      />
    </Paper>
  );
};

export default FilterList;

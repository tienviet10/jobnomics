import React, { useEffect, useState } from "react";

import {
  toggleFavorite,
  toggleJobModal,
  setSelectedJob,
} from "../../features/jobSlice";
import {
  useUpdateJobMutation,
  useUpdateJobsMutation,
  useGetAllJobsQuery,
} from "../../app/services/job-api";
import { useDispatch } from "react-redux";

import styles from "./ModalWrapper.module.css";
import {
  Typography,
  Modal,
  IconButton,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";

import { useGetAJob } from "../../hooks/get-a-job";
import DeleteJobConfirmModal from "../DeleteConfirmModal/JobModal";
import ModalPlaceholder from "./ModalPlaceholder";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [jobStatus, setJobStatus] = useState<string>("");
  const dispatch = useDispatch();
  const { categoryArray } = useGetAJob();
  const [updateJob] = useUpdateJobMutation();
  const [updateJobs, { isError, isLoading: isUpdatingJobs, isSuccess }] =
    useUpdateJobsMutation();
  const { data } = useGetAllJobsQuery();
  const {
    aJob,
    selectedJob,
    jobId,
    categoryId,
    modalState,
    isLoading,
    isFetching,
    previousJob,
  } = useGetAJob();

  const updatedDate = selectedJob?.updatedAt
    ? new Date(selectedJob.updatedAt)
    : "";

  const handleClose = () => {
    dispatch(toggleJobModal(false));
  };

  useEffect(() => {
    // Add this so when the modal load up, we dont see the previous selectedJob
    dispatch(setSelectedJob(aJob));
  }, [aJob]);

  const handleToggleFavorite = () => {
    const body = {
      jobId,
      categoryId,
      favorite: !selectedJob.isFavorite,
      interviewDate: selectedJob.interviewDate,
      type: "update",
    };
    updateJob(body);
    dispatch(
      toggleFavorite([
        selectedJob.category?.name,
        selectedJob.job.id,
        !selectedJob.isFavorite,
      ])
    );
  };

  const handleOpenDeleteConfirmationModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleStatusChange = async (event: { target: { value: string } }) => {
    const startJobs = data[selectedJob?.category.name].jobs;
    const updatedSourceJobArray = [];
    const allUpdatedJobs = [];
    const chosenJobCategory = event.target.value;

    let [removedJob] = startJobs.slice(selectedJob?.position, 1);
    removedJob = {
      ...removedJob,
      position: data[chosenJobCategory].jobs.length,
    };

    const endJobs = [...data[chosenJobCategory].jobs, removedJob];

    setJobStatus(chosenJobCategory);

    for (const index in startJobs) {
      const newPosition = startJobs[index].position - 1;
      if (selectedJob.position && Number(index) < selectedJob.position) {
        updatedSourceJobArray.push({ ...startJobs[index] });
      } else if (selectedJob.position && Number(index) > selectedJob.position) {
        updatedSourceJobArray.push({
          ...startJobs[index],
          position: newPosition,
        });
      }

      if (selectedJob.position && Number(index) > selectedJob?.position) {
        allUpdatedJobs.push({
          jobId: startJobs[index].id,
          categoryId: selectedJob?.category.id,
          newCategoryId: selectedJob?.category.id,
          position: newPosition,
          isDeleted: false,
        });
      }

      console.log(
        selectedJob.position && Number(index) === selectedJob?.position
      );
      if (Number(index) === selectedJob?.position) {
        allUpdatedJobs.push({
          jobId: selectedJob.job.id,
          categoryId: selectedJob?.category.id,
          newCategoryId: categoryArray.indexOf(chosenJobCategory) + 1,
          position: data[chosenJobCategory].jobs.length,
          isDeleted: false,
        });
      }
    }

    const newState = {
      ...data,
      [selectedJob?.category?.name]: {
        ...data[selectedJob?.category.name],
        jobs: updatedSourceJobArray,
      },
      [chosenJobCategory]: {
        ...data[chosenJobCategory],
        jobs: endJobs,
      },
    };

    console.log(allUpdatedJobs);

    const body = {
      jobUpdates: allUpdatedJobs,
      newState,
      type: "update",
    };

    await updateJobs(body);

    console.log(body);
  };

  return selectedJob && !isLoading ? (
    <Modal
      open={modalState.open}
      onClose={handleClose}
      className={styles.JobModalContainer}
    >
      <Card
        elevation={5}
        className={styles.JobModal}
        sx={{
          width: { xs: "90vw", lg: "1000px" },
          padding: { xs: "30px", md: "40px" },
          position: "relative",
        }}
      >
        {(previousJob.categoryId === modalState.jobCategoryId.categoryId &&
          previousJob.jobId === modalState.jobCategoryId.jobId) ||
        !isFetching ? (
          <>
            <div className={styles.ModalHeader}>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: "15px", right: "15px" }}
              >
                <Close fontSize="medium" />
              </IconButton>
              <div className={styles.JobHeader}>
                <Typography
                  variant="h5"
                  className={styles.JobTitle}
                  sx={{
                    fontSize: { xs: "20px", sm: "24px" },
                    fontWeight: "bold",
                  }}
                >
                  {selectedJob.job?.title}
                </Typography>
                <Box
                  className={styles.SubHeader}
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <div className={styles.CompanyLocation}>
                    <Typography
                      variant="h6"
                      className={styles.JobCompany}
                      sx={{ fontSize: { xs: "15px", sm: "20px" } }}
                    >
                      {selectedJob.job?.company} | {selectedJob.job?.location}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={styles.JobUpdatedDate}
                    >
                      Last update at: {`${updatedDate.toLocaleString()}`}
                    </Typography>
                  </div>
                  <FormControl
                    sx={{
                      minWidth: { xs: "200px" },
                      width: { xs: "100%", sm: "200px" },
                      mt: 0.5,
                    }}
                    size="small"
                  >
                    <InputLabel id="job-status-label">Job Status</InputLabel>
                    <Select
                      labelId="job-status-label"
                      id="job-status"
                      label="Job Status"
                      value={jobStatus}
                      onChange={handleStatusChange}
                    >
                      {categoryArray.map((category, index) => (
                        <MenuItem
                          key={index}
                          value={category}
                          sx={{ py: "8px" }}
                        >
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className={styles.ModalMain}>
              {children}
              <DeleteJobConfirmModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
              />
            </div>
            <div className={styles.ModalFooter}>
              <IconButton
                className={styles.Button}
                onClick={handleToggleFavorite}
                disableRipple
              >
                <Typography className={styles.ButtonText}>Favorite</Typography>
                {selectedJob?.isFavorite ? (
                  <Favorite fontSize="medium" />
                ) : (
                  <FavoriteBorder fontSize="medium" />
                )}
              </IconButton>
              <IconButton
                className={styles.Button}
                onClick={handleOpenDeleteConfirmationModal}
                disableRipple
              >
                <Typography className={styles.ButtonText}>Delete</Typography>
                <Delete fontSize="medium" />
              </IconButton>
            </div>
          </>
        ) : (
          <ModalPlaceholder />
        )}
      </Card>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalWrapper;

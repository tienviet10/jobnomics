import React, { useEffect, useState } from "react";

import {
  toggleFavorite,
  toggleJobModal,
  setSelectedJob,
  setInterviewedModalId,
  toggleInterviewedModal,
  setModalId,
} from "../../features/jobSlice";
import {
  useUpdateJobMutation,
  useUpdateJobsMutation,
  useGetAllJobsQuery,
  useAddInterviewQuestionsMutation,
  useAddChecklistsMutation,
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
  Link,
} from "@mui/material";
import {
  Close,
  Delete,
  Favorite,
  FavoriteBorder,
  OpenInNewRounded,
  DescriptionRounded,
} from "@mui/icons-material";

import { useGetAJob } from "../../hooks/get-a-job";
import DeleteJobConfirmModal from "../DeleteConfirmModal/JobModal";
import ModalPlaceholder from "./ModalPlaceholder";
import NotePadView from "../JobModal/NotePadView";
import { processColumns } from "../../helper/react-dnd-logic";
import { AllActiveJobsDataType } from "../../types/jobTypes";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const [updateJob] = useUpdateJobMutation();
  const [updateJobs] = useUpdateJobsMutation();
  const [addChecklists] = useAddChecklistsMutation();
  const [addInterviewQuestions, { isSuccess }] =
    useAddInterviewQuestionsMutation();
  const { data } = useGetAllJobsQuery({});
  // const { allActiveJobs, staleJobs } = data;
  const {
    aJob,
    selectedJob,
    jobId,
    categoryId,
    modalState,
    isLoading,
    isFetching,
    previousJob,
    categoryArray,
    refetch,
  } = useGetAJob();
  const [isNotepad, setIsNotepad] = useState(false);

  const updatedDate = selectedJob?.updatedByUserAt
    ? new Date(selectedJob.updatedByUserAt)
    : "";

  const handleClose = () => {
    dispatch(toggleJobModal(false));
    setIsNotepad(false);
  };

  const handleToggleNotepad = () => {
    setIsNotepad((prev) => !prev);
  };

  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    if (selectedJob && selectedJob.category) {
      setCurrentCategory(selectedJob.category.name);
    }
  }, [selectedJob]);

  useEffect(() => {
    // For refreshing interview questions when inside the modal
    if (isSuccess) {
      refetch();
    }
    dispatch(setSelectedJob(aJob));
  }, [aJob, isSuccess]);

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
    // TODO: Check this
    // refetch();
  };

  const handleOpenDeleteConfirmationModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleStatusChange = async (event: { target: { value: string } }) => {
    const chosenJobCategory = event.target.value;
    const chosenJobCategoryId = categoryArray.indexOf(chosenJobCategory) + 1;
    const startCategory = selectedJob.category.name;
    const startCategoryId = selectedJob.category.id;
    const startPosition = selectedJob.position;
    const newPosition = data?.allActiveJobs[chosenJobCategory].jobs.length;

    if (startCategory === chosenJobCategory) return;

    const startJobs = JSON.parse(
      JSON.stringify(data?.allActiveJobs[selectedJob?.category.name].jobs)
    );

    let [removedJob] = startJobs.splice(startPosition, 1);

    const body = processColumns(
      { droppableId: String(startCategoryId), index: startPosition },
      {
        droppableId: String(chosenJobCategoryId),
        index: newPosition,
      },
      data?.allActiveJobs as AllActiveJobsDataType,
      startCategory,
      chosenJobCategory,
      data
    );
    updateJobs(body);

    if (chosenJobCategory === "Interviewed") {
      addChecklists({ jobId: removedJob?.id });
    } else if (chosenJobCategory === "Interviewing") {
      dispatch(
        setInterviewedModalId({
          jobId: removedJob?.id,
          categoryId: chosenJobCategoryId,
        })
      );
      addInterviewQuestions({ jobId: removedJob?.id });
      if (selectedJob?.interviewDate === null) {
        dispatch(toggleInterviewedModal(true));
      }
    } else if (chosenJobCategory !== "Job Offer") {
      dispatch(
        setModalId({
          jobId: selectedJob?.job?.id,
          categoryId: chosenJobCategoryId,
        })
      );
    }

    dispatch(toggleJobModal(false));
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
                onClick={handleToggleNotepad}
                sx={{ position: "absolute", top: "15px", left: "15px" }}
              >
                <DescriptionRounded fontSize="medium" />
                <Typography fontSize={10}>Notepad</Typography>
              </IconButton>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: "15px", right: "15px" }}
              >
                <Close fontSize="medium" />
              </IconButton>
              <div className={styles.JobHeader}>
                <Link
                  variant="h5"
                  href={selectedJob.job?.link}
                  sx={{
                    color: "#000000",
                    "&:hover": { color: "primary.light" },
                  }}
                  underline="none"
                  target="_blank"
                  rel="noopener"
                  gutterBottom
                >
                  {selectedJob.job?.title}
                  <OpenInNewRounded fontSize="small" sx={{ ml: 1 }} />
                </Link>
                <Box
                  className={styles.SubHeader}
                  sx={{
                    display: "flex",
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      flexShrink: { xs: 0, sm: 1 },
                      mr: { xs: 0, sm: 4 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      className={styles.JobCompany}
                      sx={{ color: "accent.dark" }}
                    >
                      {selectedJob.job?.company} | {selectedJob.job?.location}
                    </Typography>
                    <Typography
                      variant="caption"
                      className={styles.JobUpdatedDate}
                    >
                      Last update at: {`${updatedDate.toLocaleString()}`}
                    </Typography>
                  </Box>
                  <FormControl
                    sx={{
                      minWidth: { xs: "200px", sm: "auto" },
                      maxWidth: { sm: "200px" },
                      width: { xs: "100%" },
                      mt: 2,
                    }}
                    size="small"
                  >
                    <InputLabel id="job-status-label">Job Status</InputLabel>
                    <Select
                      labelId="job-status-label"
                      id="job-status"
                      label="Job Status"
                      value={currentCategory}
                      onChange={handleStatusChange}
                      disabled={!selectedJob.isActive}
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
              {isNotepad ? <NotePadView /> : children}
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

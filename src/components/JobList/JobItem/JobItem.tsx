import React, { useEffect } from "react";

import { Draggable } from "react-beautiful-dnd";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card/Card";

import styles from "./JobItem.module.css";
import { Avatar, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import {
  useUpdateJobMutation,
  useGetJobByIdQuery,
} from "../../../app/services/job-api";
import {
  setModalId,
  toggleFavorite,
  toggleJobModal,
  setSelectedJob,
} from "../../../features/jobSlice";

type JobItemProps = {
  draggableId: string;
  index: number;
  category: string;
};

const JobItem = ({
  draggableId,
  index,
  category,
}: JobItemProps): JSX.Element => {
  const dispatch = useDispatch();

  const modalState = useSelector((state: RootState) => state.job.modal);
  const jobState = useSelector((state: RootState) => state.job.categories);
  const categories = useSelector((state: RootState) => state.job.categoryOrder);
  const selectedJob = useSelector((state: RootState) => state.job.selectedJob);

  const job = jobState[category].jobs[index];
  const { id, title, company, logo, isFavorite } = job;

  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const handleToggleFavorite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const body = {
      jobId: id,
      categoryId: jobState[category].id,
      favorite: !isFavorite,
      interviewDate: null,
      checklists: selectedJob.checklists,
      type: "update",
    };
    dispatch(toggleFavorite([category, id, !isFavorite]));
    updateJob(body);
  };

  const handleOpenModal = () => {
    dispatch(setModalId({ jobId: id, categoryId: jobState[category].id }));
    setTimeout(() => {
      dispatch(toggleJobModal(!modalState.open));
    }, 50);
  };

  return (
    <>
      <Draggable draggableId={draggableId} index={index}>
        {(provided, snapshot) => (
          <Card
            id={draggableId}
            className={styles.JobItem}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{ bgcolor: snapshot.isDragging ? "#dbe4ff" : "#ffffff" }}
            ref={provided.innerRef}
          >
            <Avatar alt={company} src={logo} onClick={handleOpenModal} />
            <div className={styles.JobDetails} onClick={handleOpenModal}>
              <Typography variant="body2">{title}</Typography>
              <Typography variant="caption">{company}</Typography>
            </div>

            {isFavorite ? (
              <Favorite fontSize="medium" onClick={handleToggleFavorite} />
            ) : (
              <FavoriteBorder
                fontSize="medium"
                onClick={handleToggleFavorite}
              />
            )}
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default JobItem;

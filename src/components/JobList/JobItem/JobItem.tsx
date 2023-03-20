import React from "react";

import { useDispatch } from "react-redux";
import {
  setModalId,
  toggleFavorite,
  toggleJobModal,
} from "../../../features/jobSlice";
import { useUpdateJobMutation } from "../../../app/services/job-api";

import { Draggable } from "react-beautiful-dnd";
import styles from "./JobItem.module.css";
import { Avatar, Typography, Card } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { useGetAJob } from "../../../hooks/get-a-job";

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

  const { allCategories: jobState, modalState } = useGetAJob();

  const job = jobState[category].jobs[index];
  const { id, title, company, logo, isFavorite } = job;

  const [updateJob, { isLoading, isSuccess, isError }] = useUpdateJobMutation();

  const handleToggleFavorite = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const body = {
      jobId: id,
      categoryId: jobState[category]?.id,
      favorite: !isFavorite,
      interviewDate: null,
      type: "update",
    };
    dispatch(toggleFavorite([category, id, !isFavorite]));
    updateJob(body);
  };

  const handleOpenModal = () => {
    dispatch(setModalId({ jobId: id, categoryId: jobState[category]?.id }));
    setTimeout(() => {
      dispatch(toggleJobModal(!modalState.open));
    }, 60);
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
